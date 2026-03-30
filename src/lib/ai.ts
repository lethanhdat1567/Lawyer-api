import { google } from "@ai-sdk/google";

export const lawModel = google("gemini-2.5-flash");

export const model = google.embedding("gemini-embedding-001");
