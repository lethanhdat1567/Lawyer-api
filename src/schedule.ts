import "dotenv/config";
import { CronJob } from "cron";
import { runLawyerCrawler } from "./schedules/crawler.js";

new CronJob(
  "*/50 * * * * *",
  async function () {
    try {
      await runLawyerCrawler();
    } catch (error) {
      console.log(error);
    }
  },
  null,
  true,
  "Asia/Ho_Chi_Minh",
);
