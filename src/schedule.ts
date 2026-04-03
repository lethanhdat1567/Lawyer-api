import "dotenv/config";
import { CronJob } from "cron";
import { cleanUploadFile } from "./schedules/cleanUploadFile.js";
import { connectPrisma } from "./lib/prisma.js";
import backupDB from "./schedules/backupDB.js";
import blogAI from "./schedules/blogAI.js";

connectPrisma();
console.log("run schedule");

new CronJob(
    "0 2 * * *",
    async function () {
        try {
            await cleanUploadFile();
        } catch (error) {
            console.log(error);
        }
    },
    null,
    false,
    "Asia/Ho_Chi_Minh",
);

new CronJob(
    "0 3 * * *",
    async function () {
        try {
            await backupDB();
        } catch (error) {
            console.log(error);
        }
    },
    null,
    false,
    "Asia/Ho_Chi_Minh",
);

new CronJob(
    "*/50 * * * * *",
    async function () {
        try {
            await blogAI();
        } catch (error) {
            console.log(error);
        }
    },
    null,
    true,
    "Asia/Ho_Chi_Minh",
);
