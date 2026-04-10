import "dotenv/config";
import { sleep } from "./lib/timer.js";
import { queueService } from "./services/queue.service.js";
import { AI_EMBEDDING_QUEUE, AI_FEEDBACK_QUEUE, FORGOT_PASSWORD_QUEUE, VERIFY_EMAIL_QUEUE } from "./constants/queue.js";
import { connectPrisma } from "./lib/prisma.js";
import { sendEmailVerification, sendPasswordResetCode } from "./services/email.service.js";
import hubFeedbackService from "./services/hub-feedback.service.js";
import { getSupabase } from "./lib/supabase.js";
import aiService from "./services/ai.service.js";
import { embeddingService } from "./services/embedding.service.js";

connectPrisma();
(async () => {
    await embeddingService.init();

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
                        break;
                    }
                    case FORGOT_PASSWORD_QUEUE: {
                        await sendPasswordResetCode(queueJob?.payload?.email, queueJob?.payload?.code);
                        break;
                    }
                    case AI_FEEDBACK_QUEUE: {
                        const exitPublicHub = await hubFeedbackService.findPublicHubById(queueJob?.payload?.hubId);

                        if (exitPublicHub) {
                            await hubFeedbackService.createFeedback(exitPublicHub?.id as string, exitPublicHub?.body);
                        }
                        break;
                    }
                    case AI_EMBEDDING_QUEUE: {
                        const lawId = queueJob?.payload?.id;

                        const supabase = getSupabase();

                        const { data: article, error } = await supabase
                            .from("law_articles")
                            .select("id, law_title, article_title, content")
                            .eq("id", lawId)
                            .single();

                        if (error) {
                            throw error;
                        }

                        const textToEmbed = `Văn bản: ${article.law_title}. ${article.article_title}: ${article.content}`;

                        const embedding = await embeddingService.generate(textToEmbed);

                        const { error: updateError } = await supabase
                            .from("law_articles")
                            .update({ embedding: embedding })
                            .eq("id", lawId);

                        if (updateError) throw updateError;

                        console.log(`Thành công: ${article.article_title}`);
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
