import { google } from "googleapis";
import fs from "fs";

class GoogleDriveService {
    private drive;

    constructor() {
        const oAuth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground",
        );

        oAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
        });

        this.drive = google.drive({
            version: "v3",
            auth: oAuth2Client,
        });
    }

    async uploadToDrive(filePath: string, fileName: string) {
        console.log(process.env.GOOGLE_DRIVE_FOLDER_ID);

        try {
            const response = await this.drive.files.create({
                requestBody: {
                    name: fileName,
                    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
                },
                media: {
                    mimeType: "application/octet-stream",
                    body: fs.createReadStream(filePath),
                },
                fields: "id",
            } as any);

            console.log(`Backup thành công! ID: ${response.data.id}`);
            return response.data.id;
        } catch (error) {
            console.error("Lỗi Upload google drive:", error);
            throw error;
        }
    }
}

export default new GoogleDriveService();
