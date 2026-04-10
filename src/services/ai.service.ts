import { embedMany, generateText, streamText } from "ai";

class AiService {
    async generateEmbeddings(textValues: string[], model = "openai/text-embedding-3-small") {
        const { embeddings } = await embedMany({
            model,
            values: textValues,
            providerOptions: {
                openai: {
                    dimensions: 384,
                },
            },
        });

        return embeddings;
    }

    async generateText(prompt: string, model = "meta/llama-3.1-8b") {
        const { text } = await generateText({
            model,
            prompt,
        });

        return text;
    }

    async generateStreamText(prompt: string, model: any, onFinish?: (text: string) => Promise<void>): Promise<any> {
        return streamText({
            model,
            prompt,
            onFinish: async ({ text }) => {
                if (onFinish) await onFinish(text);
            },
        });
    }
}

export default new AiService();
