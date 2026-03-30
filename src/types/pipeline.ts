export const TASK_TYPES = {
    HTML_CLEANING: "HTML_CLEANING",
    CLASSIFICATION: "CLASSIFICATION",
    METADATA_EXTRACT: "METADATA_EXTRACT",
    EMBEDDING: "EMBEDDING",
} as const;

export type TaskType = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];
export const REQUIRED_TASK_TYPES: TaskType[] = [
    TASK_TYPES.HTML_CLEANING,
    TASK_TYPES.CLASSIFICATION,
    TASK_TYPES.METADATA_EXTRACT,
    TASK_TYPES.EMBEDDING,
];

export interface TaskExecutionConfig {
    taskType: TaskType;
    modelName: string;
    promptId?: string;
    promptName: string;
    promptContent: string;
    isActive: boolean;
}

export interface TaskOverrideInput {
    modelName?: string;
    promptName?: string;
    promptContent?: string;
}

export interface PipelineConfig {
    byTask: Partial<Record<TaskType, TaskExecutionConfig>>;
}

export interface CrawlDraftMetadata {
    chapter?: string | null;
    article?: string | null;
    tags: string[];
    summary?: string | null;
}

export interface CrawlDraftLogRef {
    id: string;
    url: string;
    status: "SUCCESS" | "FAILED" | "NO_CHANGE";
    startedAt?: string | null;
    finishedAt?: string | null;
}

export interface CrawlDraftResponse {
    url: string;
    markdownDraft: string;
    // suggestedCategory: string | null
    metadata: CrawlDraftMetadata;
    pipeline: PipelineConfig;
    crawlLog: CrawlDraftLogRef;
}

export interface CrawlDraftInput {
    url: string;
    overrides?: Partial<Record<TaskType, TaskOverrideInput>>;
}

export interface CrawlApproveInput {
    crawlLogId: string;
    url: string;
    markdownDraft: string;
    category?: string | null;
    metadata: CrawlDraftMetadata;
    desiredStatus?: "SUCCESS" | "FAILED";
}

export interface CrawlApproveResponse {
    approved: boolean;
    crawlLog: CrawlDraftLogRef;
    syncDryRun: {
        target: "supabase";
        note: string;
        preview: {
            url: string;
            category: string | null;
            markdownLength: number;
            tagsCount: number;
            processedAt: string;
        };
    };
}
