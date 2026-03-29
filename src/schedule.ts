import { CronJob } from "cron";
import { runTestCrawler } from "./schedules/crawler.js";

new CronJob(
    "*/50 * * * * *",
    async function () {
        try {
            await runTestCrawler();
        } catch (error) {
            console.log(error);
        }
    },
    null,
    true,
    "Asia/Ho_Chi_Minh",
);
