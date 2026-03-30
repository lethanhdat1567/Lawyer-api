import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { CheerioCrawler } from "crawlee";
import { createHash } from "node:crypto";
import { CrawlLogStatus } from "../../../generated/prisma/enums.js";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import { HttpError } from "../../lib/httpError.js";
import { getPrisma } from "../../lib/prisma.js";
import {
    type CrawlApproveInput,
    type CrawlApproveResponse,
    type CrawlDraftInput,
    type CrawlDraftMetadata,
    type CrawlDraftResponse,
    type PipelineConfig,
    type TaskExecutionConfig,
    type TaskType,
} from "../../types/pipeline.js";
import adminPipelineService from "./adminPipeline.service.js";

const NOISE_SELECTORS = [
    "script",
    "style",
    "noscript",
    "svg",
    "iframe",
    "nav",
    "header",
    "footer",
    ".ads",
    ".advertisement",
    ".social-share",
    ".breadcrumb",
];

class AdminCrawlService {
    private sha256(text: string): string {
        return createHash("sha256").update(text).digest("hex");
    }

    private normalizeWhitespace(text: string): string {
        return text
            .replace(/\r/g, "\n")
            .replace(/[ \t]+/g, " ")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
    }

    private parseJsonObject(text: string): Record<string, unknown> | null {
        const trimmed = text.trim();
        const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
        const candidate = fencedMatch?.[1]?.trim() ?? trimmed;
        try {
            const parsed = JSON.parse(candidate);
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                return parsed as Record<string, unknown>;
            }
        } catch {
            return null;
        }
        return null;
    }

    private async runTextTask(config: TaskExecutionConfig, input: string): Promise<string> {
        const { text } = await generateText({
            model: google(config.modelName),
            prompt: `${config.promptContent}\n\nINPUT:\n${input.slice(0, 120_000)}`,
        });
        return text.trim();
    }

    private async crawlUrlAndExtract(url: string): Promise<{ html: string; text: string }> {
        let cleanedHtml = "";
        let plainText = "";

        const crawler = new CheerioCrawler({
            maxRequestsPerCrawl: 1,
            async requestHandler({ $, body }) {
                for (const selector of NOISE_SELECTORS) $(selector).remove();
                const bodyNode = $("body");
                cleanedHtml =
                    bodyNode.html() ?? (typeof body === "string" ? body : body.toString("utf8"));
                plainText = bodyNode.text() ?? "";
            },
            async failedRequestHandler({ request }) {
                throw new Error(`Unable to crawl url: ${request.url}`);
            },
        });

        await crawler.run([url]);
        plainText = this.normalizeWhitespace(plainText);
        if (!plainText) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                "No readable text extracted from URL",
                ErrorCode.VALIDATION_ERROR,
            );
        }
        return { html: cleanedHtml, text: plainText };
    }

    private applyPipelineOverrides(
        pipeline: PipelineConfig,
        overrides?: Partial<
            Record<TaskType, { modelName?: string; promptName?: string; promptContent?: string }>
        >,
    ): PipelineConfig {
        if (!overrides) return pipeline;
        const byTask: PipelineConfig["byTask"] = { ...pipeline.byTask };
        for (const [taskType, override] of Object.entries(overrides)) {
            const current = byTask[taskType as TaskType];
            if (!current) continue;
            byTask[taskType as TaskType] = {
                ...current,
                ...(override.modelName ? { modelName: override.modelName } : {}),
                ...(override.promptName ? { promptName: override.promptName } : {}),
                ...(override.promptContent ? { promptContent: override.promptContent } : {}),
            };
        }
        return { byTask };
    }

    private toDraftMetadata(parsed: Record<string, unknown> | null): CrawlDraftMetadata {
        const tagsRaw = parsed?.tags;
        const tags = Array.isArray(tagsRaw)
            ? tagsRaw.filter(
                  (item): item is string => typeof item === "string" && item.trim().length > 0,
              )
            : [];
        return {
            chapter: typeof parsed?.chapter === "string" ? parsed.chapter : null,
            article: typeof parsed?.article === "string" ? parsed.article : null,
            tags,
            summary: typeof parsed?.summary === "string" ? parsed.summary : null,
        };
    }

    async createCrawlDraft(input: CrawlDraftInput): Promise<CrawlDraftResponse> {
        const prisma = getPrisma();
        const crawlLog = await prisma.crawlLog.create({
            data: {
                url: input.url,
                status: CrawlLogStatus.FAILED,
                startedAt: new Date(),
            },
        });

        try {
            const basePipeline = await adminPipelineService.getPipelineConfig();
            const pipeline = this.applyPipelineOverrides(basePipeline.pipelineConfig, input.overrides);
            const htmlCleaningTask = pipeline.byTask.HTML_CLEANING;
            const classifyTask = pipeline.byTask.CLASSIFICATION;
            const metadataTask = pipeline.byTask.METADATA_EXTRACT;

            if (!htmlCleaningTask || !classifyTask || !metadataTask) {
                throw new HttpError(
                    HttpStatus.BAD_REQUEST,
                    "Pipeline config missing required tasks",
                    ErrorCode.VALIDATION_ERROR,
                );
            }

            const extracted = await this.crawlUrlAndExtract(input.url);
            const markdownDraft = await this.runTextTask(
                htmlCleaningTask,
                `URL: ${input.url}\n\nHTML:\n${extracted.html}`,
            );
            const metadataRaw = await this.runTextTask(
                metadataTask,
                `URL: ${input.url}\n\nMARKDOWN:\n${markdownDraft}\n\nReturn JSON with chapter, article, tags, summary.`,
            );
            const metadata = this.toDraftMetadata(this.parseJsonObject(metadataRaw));

            const updatedLog = await prisma.crawlLog.update({
                where: { id: crawlLog.id },
                data: {
                    status: CrawlLogStatus.SUCCESS,
                    contentHash: this.sha256(extracted.text),
                    fullTextHash: this.sha256(markdownDraft),
                    finishedAt: new Date(),
                },
            });

            return {
                url: input.url,
                markdownDraft,
                metadata,
                pipeline,
                crawlLog: {
                    id: updatedLog.id,
                    url: updatedLog.url,
                    status: updatedLog.status,
                    startedAt: updatedLog.startedAt?.toISOString() ?? null,
                    finishedAt: updatedLog.finishedAt?.toISOString() ?? null,
                },
            };
        } catch (error) {
            const message =
                error instanceof Error ? error.message.slice(0, 5_000) : "Unknown crawl error";
            await prisma.crawlLog.update({
                where: { id: crawlLog.id },
                data: {
                    status: CrawlLogStatus.FAILED,
                    errorMessage: message,
                    finishedAt: new Date(),
                },
            });
            throw error;
        }
    }

    async approveCrawlDraft(input: CrawlApproveInput): Promise<CrawlApproveResponse> {
        const prisma = getPrisma();
        const existingLog = await prisma.crawlLog.findUnique({ where: { id: input.crawlLogId } });
        if (!existingLog) {
            throw new HttpError(HttpStatus.NOT_FOUND, "Crawl log not found", ErrorCode.NOT_FOUND);
        }
        if (existingLog.url !== input.url) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                "Crawl log url mismatch",
                ErrorCode.VALIDATION_ERROR,
            );
        }

        const basePipeline = await adminPipelineService.getPipelineConfig();
        const metadataTask = basePipeline.pipelineConfig.byTask.METADATA_EXTRACT;
        if (!metadataTask) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                "Pipeline config missing METADATA_EXTRACT",
                ErrorCode.VALIDATION_ERROR,
            );
        }

        const syncNote = await this.runTextTask(
            metadataTask,
            `Prepare sync metadata summary for approved markdown.\n\nURL: ${input.url}\nCATEGORY: ${input.category ?? ""}\nMARKDOWN:\n${input.markdownDraft}`,
        );
        const finalStatus =
            input.desiredStatus === CrawlLogStatus.FAILED
                ? CrawlLogStatus.FAILED
                : CrawlLogStatus.SUCCESS;
        const now = new Date();

        const updatedLog = await prisma.crawlLog.update({
            where: { id: existingLog.id },
            data: {
                status: finalStatus,
                fullTextHash: this.sha256(input.markdownDraft),
                contentHash: this.sha256(this.normalizeWhitespace(input.markdownDraft)),
                errorMessage:
                    finalStatus === CrawlLogStatus.FAILED
                        ? "Marked as failed by admin approve flow"
                        : null,
                finishedAt: now,
            },
        });

        const syncPayloadPreview = {
            url: input.url,
            category: input.category ?? null,
            metadata: input.metadata,
            markdownLength: input.markdownDraft.length,
            tagsCount: input.metadata.tags.length,
            processedAt: now.toISOString(),
        };
        console.info(
            "[ADMIN_CRAWL_APPROVE_SUPABASE_DRY_RUN]",
            JSON.stringify({ note: syncNote, payload: syncPayloadPreview }),
        );

        return {
            approved: finalStatus === CrawlLogStatus.SUCCESS,
            crawlLog: {
                id: updatedLog.id,
                url: updatedLog.url,
                status: updatedLog.status,
                startedAt: updatedLog.startedAt?.toISOString() ?? null,
                finishedAt: updatedLog.finishedAt?.toISOString() ?? null,
            },
            syncDryRun: {
                target: "supabase",
                note: syncNote,
                preview: {
                    url: syncPayloadPreview.url,
                    category: syncPayloadPreview.category,
                    markdownLength: syncPayloadPreview.markdownLength,
                    tagsCount: syncPayloadPreview.tagsCount,
                    processedAt: syncPayloadPreview.processedAt,
                },
            },
        };
    }
}

export default new AdminCrawlService();
