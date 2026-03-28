import "dotenv/config";
import { createApp } from "./app.js";
import { connectPrisma, disconnectPrisma } from "./lib/prisma.js";

const port = Number(process.env.PORT) || 4000;

async function main(): Promise<void> {
  connectPrisma();
  const app = createApp();
  const server = app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });

  const shutdown = async () => {
    server.close();
    await disconnectPrisma();
    process.exit(0);
  };

  process.on("SIGINT", () => {
    void shutdown();
  });
  process.on("SIGTERM", () => {
    void shutdown();
  });
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
