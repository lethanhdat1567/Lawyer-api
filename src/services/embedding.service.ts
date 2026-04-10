import { pipeline } from "@xenova/transformers";

class EmbeddingService {
    private extractor: any;

    async init() {
        this.extractor = await pipeline("feature-extraction", "Xenova/paraphrase-multilingual-MiniLM-L12-v2");
    }

    async generate(text: string): Promise<number[]> {
        if (!this.extractor) await this.init();

        const output = await this.extractor(text, { pooling: "mean", normalize: true });
        return Array.from(output.data);
    }
}

export const embeddingService = new EmbeddingService();
