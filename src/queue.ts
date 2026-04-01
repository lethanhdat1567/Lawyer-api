import "dotenv/config";
import { sleep } from "./lib/timer.js";
import { queueService } from "./services/queue.service.js";
import { AI_FEEDBACK_QUEUE, FORGOT_PASSWORD_QUEUE, VERIFY_EMAIL_QUEUE } from "./constants/queue.js";
import { connectPrisma } from "./lib/prisma.js";
import { sendEmailVerification, sendPasswordResetCode } from "./services/email.service.js";

connectPrisma();
(async () => {
    while (true) {
        const queueJob: any = await queueService.findOnePending();

        if (queueJob) {
            const { id, type } = queueJob;

            await queueService.updateStatus(queueJob.id, "processing");
            console.log(`Queue Job: processing job ${type}`);

            try {
                switch (type) {
                    case VERIFY_EMAIL_QUEUE: {
                        await sendEmailVerification(queueJob?.payload?.email, queueJob?.payload?.rawToken);
                    }
                    case FORGOT_PASSWORD_QUEUE: {
                        await sendPasswordResetCode(queueJob?.payload?.email, queueJob?.payload?.code);
                    }
                    case AI_FEEDBACK_QUEUE: {
                    }
                }

                await queueService.updateStatus(id, "completed");
                console.log(`Queue Job: done job ${type}`);
            } catch (error) {
                console.log(`Queue Job: error job ${type}`, error);
                await queueService.updateStatus(id, "error");
            }
        }

        await sleep(2);
    }
})();
