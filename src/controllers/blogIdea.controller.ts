import { IdeaStatus } from "../../generated/prisma/client.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import blogIdeaService from "../services/blog-idea.service.js";

const IDEA_STATUSES: IdeaStatus[] = ["PENDING", "COMPLETED", "FAILED"];

function parseListStatusQuery(raw: unknown): IdeaStatus | undefined | "invalid" {
    if (raw === undefined || raw === "" || raw === "all") {
        return undefined;
    }
    if (typeof raw !== "string") {
        return "invalid";
    }
    return IDEA_STATUSES.includes(raw as IdeaStatus) ? (raw as IdeaStatus) : "invalid";
}

class BlogIdeaController {
    async listIdeas(req: any, res: any) {
        const parsed = parseListStatusQuery(req.query.status);
        if (parsed === "invalid") {
            res.error({
                code: ErrorCode.VALIDATION_ERROR,
                message: "Invalid status. Use all, PENDING, COMPLETED, or FAILED.",
                statusCode: HttpStatus.BAD_REQUEST,
            });
            return;
        }
        const ideas = await blogIdeaService.listIdeas(parsed);
        return res.success({ ideas });
    }

    async createIdea(req: any, res: any) {
        const raw = req.body?.quantity;
        const quantity = typeof raw === "string" ? Number(raw) : Number(raw);
        const [error, result] = await blogIdeaService.createWithQuantity(quantity);

        if (error) {
            res.error({
                code: ErrorCode.VALIDATION_ERROR,
                message: error,
                statusCode: HttpStatus.BAD_REQUEST,
            });
            return;
        }

        return res.success(result);
    }

    async destroyIdea(req: any, res: any) {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id < 1) {
            res.error({
                code: ErrorCode.VALIDATION_ERROR,
                message: "Invalid idea id",
                statusCode: HttpStatus.BAD_REQUEST,
            });
            return;
        }
        try {
            const idea = await blogIdeaService.destroy(id);
            return res.success(idea);
        } catch {
            res.error({
                code: ErrorCode.NOT_FOUND,
                message: "Blog idea not found",
                statusCode: HttpStatus.NOT_FOUND,
            });
            return;
        }
    }
}

export default new BlogIdeaController();
