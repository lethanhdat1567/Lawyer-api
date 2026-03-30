import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, TaskType } from "../generated/prisma/client.js";

interface PromptSeedItem {
    name: string;
    taskType: TaskType;
    content: string;
}

interface TaskConfigSeedItem {
    taskType: TaskType;
    modelName: string;
    promptName: string;
}

async function seed(): Promise<void> {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) throw new Error("DATABASE_URL is required to run seed");

    const prisma = new PrismaClient({
        adapter: new PrismaMariaDb(databaseUrl),
    });

    try {
        const prompts: PromptSeedItem[] = [
            {
                name: "prompt_format",
                taskType: TaskType.HTML_CLEANING,
                content:
                    "Chuyen HTML sau thanh Markdown sach, giu dung cau truc tieu de, muc, dieu, khoan. Loai bo script/style/noise va giu noi dung phap ly quan trong.",
            },
            {
                name: "prompt_classify",
                taskType: TaskType.CLASSIFICATION,
                content:
                    "Phan loai van ban vao 1 linh vuc luat phu hop nhat, tra ve category_name va ly do ngan gon dua tren noi dung.",
            },
            {
                name: "prompt_summary",
                taskType: TaskType.METADATA_EXTRACT,
                content:
                    "Trich xuat metadata gom: chapter, article, tags, summary. Summary ngan gon, de hieu, phuc vu tim kiem va review cua admin.",
            },
            {
                name: "prompt_embedding",
                taskType: TaskType.EMBEDDING,
                content:
                    "Tao dau vao embedding toi uu cho semantic search. Uu tien noi dung dieu khoan, dinh nghia, muc phat, thoi han va ngoai le.",
            },
        ];

        const promptIdByName = new Map<string, string>();
        for (const prompt of prompts) {
            const savedPrompt = await prisma.prompt.upsert({
                where: { name: prompt.name },
                update: {
                    content: prompt.content,
                    taskType: prompt.taskType,
                },
                create: {
                    name: prompt.name,
                    content: prompt.content,
                    taskType: prompt.taskType,
                },
            });
            promptIdByName.set(prompt.name, savedPrompt.id);
        }

        const taskConfigs: TaskConfigSeedItem[] = [
            {
                taskType: TaskType.HTML_CLEANING,
                modelName: "gemini-2.0-flash",
                promptName: "prompt_format",
            },
            {
                taskType: TaskType.CLASSIFICATION,
                modelName: "gpt-4o-mini",
                promptName: "prompt_classify",
            },
            {
                taskType: TaskType.METADATA_EXTRACT,
                modelName: "gemini-2.0-flash",
                promptName: "prompt_summary",
            },
            {
                taskType: TaskType.EMBEDDING,
                modelName: "text-embedding-004",
                promptName: "prompt_embedding",
            },
        ];

        for (const config of taskConfigs) {
            const defaultPromptId = promptIdByName.get(config.promptName);
            if (!defaultPromptId) {
                throw new Error(
                    `Prompt '${config.promptName}' not found in seed map`,
                );
            }

            await prisma.taskConfig.upsert({
                where: { taskType: config.taskType },
                update: {
                    modelName: config.modelName,
                    defaultPromptId,
                    isActive: true,
                },
                create: {
                    taskType: config.taskType,
                    modelName: config.modelName,
                    defaultPromptId,
                    isActive: true,
                },
            });
        }
    } finally {
        await prisma.$disconnect();
    }
}

seed()
    .then(() => {
        console.log("Seed completed: prompts and task_configs are ready.");
    })
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    });
