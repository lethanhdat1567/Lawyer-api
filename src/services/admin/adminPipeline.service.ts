import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import { HttpError } from "../../lib/httpError.js";
import { getPrisma } from "../../lib/prisma.js";
import {
    REQUIRED_TASK_TYPES,
    type PipelineConfig,
    type TaskExecutionConfig,
    type TaskType,
} from "../../types/pipeline.js";

class AdminPipelineService {
    async getPipelineConfig(): Promise<{ pipelineConfig: PipelineConfig }> {
        const prisma = getPrisma();

        const rows = await prisma.taskConfig.findMany({
            where: { isActive: true },
            include: {
                defaultPrompt: {
                    select: {
                        id: true,
                        name: true,
                        content: true,
                        taskType: true,
                    },
                },
            },
            orderBy: { updatedAt: "desc" },
        });

        const byTask: Partial<Record<TaskType, TaskExecutionConfig>> = {};
        for (const row of rows) {
            const taskType = row.taskType as TaskType;
            byTask[taskType] = {
                taskType,
                modelName: row.modelName,
                promptId: row.defaultPrompt.id,
                promptName: row.defaultPrompt.name,
                promptContent: row.defaultPrompt.content,
                isActive: row.isActive,
            };
        }

        const missingTasks = REQUIRED_TASK_TYPES.filter((taskType) => !byTask[taskType]);
        if (missingTasks.length > 0) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                `Pipeline config is incomplete. Missing tasks: ${missingTasks.join(", ")}`,
                ErrorCode.VALIDATION_ERROR,
            );
        }

        const wrongPromptBindings = rows.filter(
            (row) => row.taskType !== row.defaultPrompt.taskType,
        );
        if (wrongPromptBindings.length > 0) {
            const taskList = wrongPromptBindings.map((row) => row.taskType).join(", ");
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                `Task config has prompt type mismatch for tasks: ${taskList}`,
                ErrorCode.VALIDATION_ERROR,
            );
        }

        return { pipelineConfig: { byTask } };
    }
}

export default new AdminPipelineService();
