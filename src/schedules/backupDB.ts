import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import googleDriveService from "../services/googleDrive.service.js";

async function backupDB() {
    const backupDir = "./backup";

    // 1. Kiểm tra và tạo folder backup nếu chưa có
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
        console.log(`Đã tạo thư mục: ${backupDir}`);
    }

    const fileName = `todo-${new Date().toISOString().split("T")[0]}.sql`;
    const outputFile = path.join(backupDir, fileName);

    const outputStream = fs.createWriteStream(outputFile);
    const mysqldump = spawn("mysqldump", [
        `-u${process.env.DB_USER}`,
        `-p${process.env.DB_PASSWORD}`,
        process.env.DB_NAME as string,
    ]);

    mysqldump.stdout.pipe(outputStream);

    // Bắt lỗi spawn (ví dụ: chưa cài mysqldump)
    mysqldump.on("error", (err) => {
        console.error("Lỗi thực thi mysqldump:", err);
        outputStream.end();
        if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    });

    mysqldump.on("close", (code) => {
        outputStream.end(); // Kết thúc stream ghi file

        if (code !== 0) {
            console.error(`mysqldump thất bại với mã lỗi: ${code}`);
            if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
            return;
        }

        console.log(`Đã dump DB thành công: ${fileName}`);
    });

    // Chỉ upload khi stream đã ghi xong hoàn toàn vào ổ cứng
    outputStream.on("finish", async () => {
        try {
            console.log(`Đang upload: ${fileName}`);
            await googleDriveService.uploadToDrive(outputFile, fileName);
            console.log("Upload hoàn tất!");

            // Tùy chọn: Xóa file local sau khi upload thành công để tiết kiệm dung lượng
            // fs.unlinkSync(outputFile);
        } catch (err: any) {
            console.error("Lỗi khi upload lên Drive:", err.message);
        }
    });
}

export default backupDB;
