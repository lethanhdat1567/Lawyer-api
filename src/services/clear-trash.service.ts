import fs from "fs/promises";
import path from "path";
import { getPrisma } from "../lib/prisma.js";

class ClearTrashService {
    private readonly UPLOAD_DIR = path.join(process.cwd(), "uploads", "store");

    async getTrashFile() {
        const prisma = await getPrisma();

        const [profiles, blogPosts] = await Promise.all([
            prisma.profile.findMany({ select: { avatarUrl: true } }),
            prisma.blogPost.findMany({ select: { thumbnailUrl: true, body: true } }),
        ]);

        const filesInDb = new Set<string>();

        // 1. Lấy Avatar
        profiles.forEach((p) => p.avatarUrl && filesInDb.add(p.avatarUrl));

        blogPosts.forEach((b) => {
            if (b.thumbnailUrl) filesInDb.add(b.thumbnailUrl);

            if (b.body) {
                const bodyImages = this.extractImageSources(b.body);
                bodyImages.forEach((src) => filesInDb.add(src));
            }
        });

        const allPhysicalFiles = await this.getAllFilesRecursively(this.UPLOAD_DIR);

        const trashFiles = allPhysicalFiles.filter((filePath) => {
            const relativePath = this.toRelativePath(filePath);

            return !filesInDb.has(relativePath);
        });

        return trashFiles;
    }

    private async getAllFilesRecursively(dir: string): Promise<string[]> {
        try {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            const files = await Promise.all(
                entries.map((res) => {
                    const resPath = path.resolve(dir, res.name);
                    return res.isDirectory() ? this.getAllFilesRecursively(resPath) : resPath;
                }),
            );
            return Array.prototype.concat(...files);
        } catch (e) {
            return [];
        }
    }

    private toRelativePath(fullPath: string): string {
        const fileName = path.basename(fullPath);

        return `/upload/${fileName}`;
    }

    private extractImageSources(html: string): string[] {
        if (!html) return [];

        // Regex tìm giá trị bên trong thuộc tính src của thẻ img
        const imgRegExp = /<img [^>]*src="([^"]+)"/g;
        const sources: string[] = [];
        let match;

        while ((match = imgRegExp.exec(html)) !== null) {
            let src = match[1];

            // Nếu src là URL tuyệt đối (có http...), ta cần lấy phần path sau domain
            try {
                if (src.startsWith("http")) {
                    const url = new URL(src);
                    src = url.pathname; // Trả về /upload/file.jpg
                }
            } catch (e) {
                // Nếu không phải URL hợp lệ, giữ nguyên để check tiếp
            }

            sources.push(src);
        }

        return sources;
    }

    async handleCleanTrash(dryRun: boolean = false) {
        const startTime = Date.now();
        console.log(`[Cleanup] Bắt đầu quét file rác... (Mode: ${dryRun ? "DRY RUN" : "PRODUCTION"})`);

        try {
            const trashFiles = await this.getTrashFile();

            if (trashFiles.length === 0) {
                console.log("[Cleanup] Tuyệt vời! Không có file rác nào.");
                return { deleted: 0, time: Date.now() - startTime };
            }

            console.log(`[Cleanup] Tìm thấy ${trashFiles.length} file rác.`);

            if (dryRun) {
                trashFiles.forEach((f) => console.log(`[DryRun] Will delete: ${this.toRelativePath(f)}`));
                return { deleted: 0, potential: trashFiles.length };
            }

            const batchSize = 10;
            let deletedCount = 0;
            let errorCount = 0;

            for (let i = 0; i < trashFiles.length; i += batchSize) {
                const batch = trashFiles.slice(i, i + batchSize);

                const results = await Promise.allSettled(batch.map((file) => fs.unlink(file)));

                results.forEach((res, index) => {
                    if (res.status === "fulfilled") {
                        deletedCount++;
                    } else {
                        errorCount++;
                        console.error(`[Cleanup] Lỗi khi xóa file ${trashFiles[i + index]}:`, res.reason);
                    }
                });
            }

            const duration = (Date.now() - startTime) / 1000;
            console.log(`--- KẾT QUẢ ---`);
            console.log(`- Đã xóa thành công: ${deletedCount} file`);
            console.log(`- Thất bại: ${errorCount} file`);
            console.log(`- Tổng thời gian: ${duration}s`);

            return { deleted: deletedCount, errors: errorCount };
        } catch (error) {
            console.error("[Cleanup] Lỗi nghiêm trọng trong quá trình xử lý:", error);
            throw error;
        }
    }
}

export default new ClearTrashService();
