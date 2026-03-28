import "dotenv/config";
import { defineConfig } from "prisma/config";

/** Placeholder for `prisma generate` when DATABASE_URL is unset (install/CI). Use a real URL in .env for migrate. */
const databaseUrl =
  process.env.DATABASE_URL ?? "mysql://127.0.0.1:3306/prisma_generate_placeholder";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
