import { pipeline, FeatureExtractionPipeline } from "@xenova/transformers";

export class LocalAiService {
    private static instance: FeatureExtractionPipeline | null = null;

    private static async getModel() {
        if (!this.instance) {
            this.instance = await pipeline("feature-extraction", "Xenova/paraphrase-multilingual-MiniLM-L12-v2");
        }
        return this.instance;
    }

    static async generateBatch(texts: string[]): Promise<number[][]> {
        const model = await this.getModel();
        const results: number[][] = [];

        for (const text of texts) {
            // Chuyển văn bản thành vector
            const output = await model(text, { pooling: "mean", normalize: true });
            results.push(Array.from(output.data as Float32Array));
        }

        return results;
    }

    static async generate(text: string): Promise<number[]> {
        const model = await this.getModel();
        const output = await model(text, { pooling: "mean", normalize: true });
        return Array.from(output.data as Float32Array);
    }
}
