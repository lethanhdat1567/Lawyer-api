import { google, GoogleEmbeddingModelOptions } from "@ai-sdk/google";
import { embed, embedMany, generateText, streamText, StreamTextResult } from "ai";

class AIService {
    async generateGoogleText(prompt: string, model = "gemini-2.5-flash") {
        const { text } = await generateText({
            model: google(model),
            prompt: prompt,
        });

        return text;
    }

    async generateEmbedding(text: string, model = "gemini-embedding-001") {
        const modelEmbedding = google.embedding(model);

        const { embedding } = await embed({
            model: modelEmbedding,
            value: text,
            providerOptions: {
                google: {
                    outputDimensionality: 768,
                } satisfies GoogleEmbeddingModelOptions,
            },
        });

        return embedding;
    }

    async generateBatchEmbeddings(values: string[], model = "gemini-embedding-001") {
        if (!values.length) return [];

        const modelEmbedding = google.embedding(model);

        const { embeddings } = await embedMany({
            model: modelEmbedding,
            values: values,
            providerOptions: {
                google: {
                    outputDimensionality: 768,
                } satisfies GoogleEmbeddingModelOptions,
            },
        });

        return embeddings;
    }

    async generateStreamText(
        prompt: string,
        options?: { onFinish?: (text: string) => Promise<void> },
        model = "gemini-2.5-flash",
    ): Promise<StreamTextResult<any, any>> {
        const execute = (m: string) =>
            streamText({
                model: google(m),
                prompt,
                providerOptions: {
                    google: {
                        thinkingConfig: { thinkingBudget: 2048 }, // Tận dụng sức mạnh 2.5
                    },
                },
                onFinish: async (event) => {
                    if (options?.onFinish) await options.onFinish(event.text);
                },
            });

        try {
            return await execute(model);
        } catch (error: any) {
            // Nếu 2.5 hết lượt, nhảy qua 2.0-flash hoặc 1.5-pro (thường bản Pro ít bị limit hơn bản Flash Free)
            if (error.statusCode === 429) {
                console.warn("2.5 Limit rồi! Nhảy qua bản Pro chữa cháy...");
                return await execute("gemini-1.5-pro");
            }
            throw error;
        }
    }
}

export default new AIService();
