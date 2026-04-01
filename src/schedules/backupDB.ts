import { spawn } from "child_process";
import fs from "fs";
import googleDriveService from "../services/googleDrive.service.js";
// import googleDriveService from "~/services/googleDrive.service";

async function backupDB() {
    const fileName = `todo-${new Date().toISOString().split("T")[0]}.sql`;
    const outputFile = `./backup/${fileName}`;

    const outputStream = fs.createWriteStream(outputFile);

    const mysqldump = spawn("mysqldump", ["-uadmin", "-padmin", "lawyerai"]);

    mysqldump.stdout.pipe(outputStream);

    mysqldump.on("close", async (code) => {
        outputStream.end();

        if (code === 0) {
            outputStream.end();
        } else {
            fs.unlinkSync(outputFile);
        }
    });

    outputStream.on("finish", async () => {
        try {
            console.log(`Đang upload: ${fileName}`);
            await googleDriveService.uploadToDrive(outputFile, fileName);
            console.log("Upload hoàn tất!");
        } catch (err) {
            console.error("Upload failed:", err);
        }
    });
}

export default backupDB;
