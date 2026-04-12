# LegalAdvisor AI — Backend API

TypeScript **Express** service for **LegalAdvisor AI** (LawyerAI): relational domain data in **MySQL**, legal **RAG** over **Supabase** (`law_articles` + `match_law_articles`), and **Vercel AI SDK** (`ai`) for generation and streaming.

## 🔗 Ecosystem

This repository is the **backend** component of the **LegalAdvisor AI** system. For the full product (UI, marketing, assistant, admin), set up the frontend as well:

- **Frontend (UI):** [LawyerAI-UI](https://github.com/lethanhdat-swe/lawyerAI-UI) — Next.js 15, Tailwind CSS, and shadcn/ui.

Point the UI at this API with **`NEXT_PUBLIC_API_BASE_URL`** (no trailing slash), e.g. `http://localhost:4000`.

> **Note:** For a seamless local setup, clone both repositories into the **same parent directory** (e.g. `LawyerAI-api` and `LawyerAI-UI` as siblings). Full environment tables for both sides: **`LawyerAI-UI` `README.md`** (or `../LawyerAI-UI/README.md` when cloned side by side).

---

## 🧩 Technical highlights

| Area                   | What ships in this repo                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Hybrid persistence** | **Prisma 7** + **MySQL** (`prisma/schema.prisma`) for users, Hub, blog, assistant sessions, AI config, job queue, crawls, etc. **Supabase JS** (`@supabase/supabase-js`) talks to Postgres for `law_articles` and the **`match_law_articles`** RPC (vector similarity over stored embeddings).                                                                                                                                             |
| **Embedding pipeline** | **`@xenova/transformers`** — `pipeline("feature-extraction", "Xenova/paraphrase-multilingual-MiniLM-L12-v2")` with **mean pooling** and **L2 normalize** (`src/services/embedding.service.ts`). Queue worker writes vectors back to Supabase (`src/queue.ts`, job type `AI_EMBEDDING_QUEUE`).                                                                                                                                              |
| **RAG + LLM**          | Query embeddings + RPC retrieval, optional **Điều N** title filter on `law_articles`, prompt assembly from **`AiConfig`** (`ai_configs` table via `src/services/ai-config.service.ts`), then **`streamText` / `generateText`** from the **`ai`** package (`src/services/ai.service.ts`). Chat uses the **model string** from the first **`ScheduleBlogSystem`** row (`schedule_blog_system.model`, see `src/services/chat-ai.service.ts`). |
| **Streaming HTTP**     | Assistant responses are converted to a **`Response`** and piped through Express with proxy-friendly headers (`src/controllers/chat-ai.controller.ts`).                                                                                                                                                                                                                                                                                     |
| **Automation**         | **`cron`** jobs in `src/schedule.ts` (upload cleanup, DB backup, blog AI). **`src/queue.ts`** polls **`QueueJob`** in MySQL and runs email, hub AI feedback, and embedding jobs. Legal crawling uses **Crawlee** in admin services (`package.json` / `src/services/admin/`).                                                                                                                                                               |

---

## 📦 Stack

| Layer              | Technology                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime            | Node.js **≥ 20** (ESM, `tsx` in dev)                                                                                                                                                                       |
| HTTP               | Express **4.x**                                                                                                                                                                                            |
| ORM / DB           | Prisma **7.x**, MySQL, **`@prisma/adapter-mariadb`**, client output `generated/prisma`                                                                                                                     |
| Vector / RAG store | Supabase (Postgres + **`match_law_articles`**)                                                                                                                                                             |
| Local embeddings   | **`@xenova/transformers`**                                                                                                                                                                                 |
| LLM SDK            | **`ai`** (Vercel AI SDK); **`@ai-sdk/google`** is installed; `src/lib/ai.ts` holds optional Gemini model constructors (not currently imported by services — chat/blog use DB + `ai.service` string models) |
| Auth               | JWT + **firebase-admin** for Firebase ID tokens                                                                                                                                                            |
| Other              | **bcrypt**, **zod**, **multer**, **nodemailer**, **helmet**, **express-rate-limit**, **googleapis** (Drive backup)                                                                                         |

---

## 🔍 Core architecture (RAG flow)

### 1. Indexing (offline / async)

1. A pending row in **`QueueJob`** (`AI_EMBEDDING_QUEUE`) carries a `law_articles` id (`src/queue.ts`).
2. **`getSupabase()`** loads the row from **`law_articles`** (`src/lib/supabase.ts`).
3. **`embeddingService.generate(...)`** runs the Xenova pipeline on concatenated law metadata + content (`src/services/embedding.service.ts`).
4. The resulting **`embedding`** vector is **`update`**d on the same Supabase row (`src/queue.ts`).

**Source of truth:** `src/queue.ts`, `src/services/embedding.service.ts`, `src/lib/supabase.ts`, `src/constants/queue.ts`.

### 2. Retrieval (online)

1. **`ChatAIService.ask`** (`src/services/chat-ai.service.ts`):
    - Regex **`/Điều\s+(\d+)/i`**; if matched, **`law_articles`** is queried with **`.or(...ilike...)`** on **`article_title`** for that article number (limit 2).
    - **`embeddingService.generate(userQuestion)`** produces **`query_embedding`**.
    - **`supabase.rpc("match_law_articles", { query_embedding, match_threshold: 0.5, match_count: 8 })`** returns semantic neighbors.
    - Exact hits stay first; vector rows are **deduped by `id`**; combined list is capped at **10**.
2. **Hub AI feedback** reuses the same RPC with **`match_count: 10`** and **`match_threshold: 0.5`** (`src/services/hub-feedback.service.ts`).

**Source of truth:** `src/services/chat-ai.service.ts`, `src/services/hub-feedback.service.ts`, `src/lib/supabase.ts`.

### 3. Prompting and configuration

1. **Advisor** prompt text: **`aiConfigService.getPromptByType("advisor")`** → row **`AiConfig`** id `1` (`src/services/ai-config.service.ts`, table **`ai_configs`**).
2. **Community** (hub) and **blog** prompts use the same service with **`community`** / **`blog`** (`src/services/hub-feedback.service.ts`, `src/services/blog.service.ts`, `src/services/blog-idea.service.ts`).
3. Retrieved articles are formatted into a single **`contextString`** block in the user-facing services above.

### 4. Generation and persistence

1. **`aiService.generateStreamText(prompt, model, onFinish)`** calls **`streamText`** from **`ai`** (`src/services/ai.service.ts`). **`model`** is loaded from **`prisma.scheduleBlogSystem.findFirst({ select: { model: true } })`** for chat and blog paths; if unset, **`ai.service.ts`** defaults include **`meta/llama-3.1-8b`** for **`generateText`**.
2. **`onFinish`** persists the assistant message via **`chatMessageService.createMessage`** when **`sessionId`** is present (`src/services/chat-ai.service.ts`, `src/services/chat-message.service.ts`).
3. **HTTP:** **`answer.toTextStreamResponse()`** is piped to the client (`src/controllers/chat-ai.controller.ts`).

**Note:** **`ai.service.ts`** also defines **`generateEmbeddings`** via **`embedMany`** (default **`openai/text-embedding-3-small`**) — **not used** by the RAG path above; production retrieval embeddings are **Xenova-only** in this codebase.

---

## Project structure

```text
LawerAI-api/
├── prisma/
│   ├── schema.prisma          # MySQL models (User, Hub, Blog, QueueJob, AiConfig, …)
│   ├── migrations/
│   └── seed.ts
├── prisma.config.ts           # Prisma 7 datasource URL + seed command
├── generated/prisma/          # Prisma Client (gitignored after generate)
└── src/
    ├── server.ts              # Entry: PORT, listen
    ├── app.ts                 # Express app, CORS (FRONTEND_URL)
    ├── queue.ts               # Long-polling worker: email, hub AI, embeddings
    ├── schedule.ts            # Cron: clean uploads, backup, blog AI
    ├── constants/             # Queue names, HTTP/error codes
    ├── controllers/         # Thin handlers (e.g. chat-ai.controller.ts)
    ├── middlewares/           # auth, rateLimit (env-tunable windows)
    ├── routes/                # Route groups + admin/public splits
    ├── schedules/             # Cron task implementations (backupDB, blogAI, …)
    ├── services/              # Domain + AI + RAG (see chat-ai, embedding, hub-feedback)
    │   ├── admin/
    │   ├── blog/
    │   ├── hub/
    │   └── reputation/
    ├── validators/            # zod schemas
    ├── lib/                   # prisma, supabase, firebaseAdmin, parsers, uploads
    └── types/
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-org/LawyerAI-api.git
cd LawyerAI-api

npm install

cp .env.example .env
# Edit .env: DATABASE_URL, Supabase, JWT, Firebase (if used), SMTP (prod), AI provider keys for your model IDs.

npx prisma generate
npx prisma migrate dev

npm run dev
```

| Script                            | Purpose                                                      |
| --------------------------------- | ------------------------------------------------------------ |
| **`npm run dev`**                 | `tsx watch src/server.ts`                                    |
| **`npm run schedule`**            | Cron worker (`src/schedule.ts`)                              |
| **`npm run queue`**               | Queue worker (`src/queue.ts`; initializes Xenova on startup) |
| **`npm run build` / `npm start`** | `tsc` → `node dist/src/server.js`                            |

Default API origin: **http://localhost:4000** (`PORT`).
