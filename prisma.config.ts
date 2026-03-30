import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl =
    process.env.DATABASE_URL ??
    "mysql://127.0.0.1:3306/prisma_generate_placeholder";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: databaseUrl,
    },
});
