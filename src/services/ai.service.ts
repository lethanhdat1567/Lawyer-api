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

    async generateStreamText(prompt: string, model = "gemini-2.5-flash"): Promise<StreamTextResult<any, any>> {
        const result = streamText({
            model: google(model),
            prompt,
        });

        return result;
    }
}

export default new AIService();
