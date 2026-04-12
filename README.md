# LegalAdvisor AI — backend API

LegalAdvisor AI (LawyerAI) is a backend API that powers an AI-driven legal advisory platform for Vietnamese users — RAG over a curated law database, streaming assistant chat, and community (hub) AI feedback.

[![Node.js](https://img.shields.io/badge/node.js-%3E%3D20-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![Build](https://img.shields.io/badge/build-no%20GitHub%20Actions%20workflow-lightgrey)](https://github.com/lethanhdat1567/Lawer-api/actions) [![License](https://img.shields.io/badge/license-private-lightgrey)](https://github.com/lethanhdat1567/Lawer-api)

**Frontend (Next.js UI):** [github.com/lethanhdat-swe/LawyerAI-UI](https://github.com/lethanhdat-swe/LawyerAI-UI) — point the app at this API with **`NEXT_PUBLIC_API_BASE_URL`** (no trailing slash), e.g. `http://localhost:4000`. Clone both repos as **siblings** under the same parent folder for a smooth local setup; full UI env notes live in that repo’s **`README.md`**.

## Table of contents

- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [API reference](#api-reference)
- [Architecture (RAG flow)](#architecture-rag-flow)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)

## Prerequisites

| Requirement | Notes |
| --- | --- |
| Node.js | **≥ 20** (ESM; `engines` in `package.json`). |
| MySQL | **8.x** or compatible server; Prisma uses the `mysql` provider with **`@prisma/adapter-mariadb`** at runtime. |
| Supabase | A Supabase (Postgres) project with **`pgvector`** enabled, `law_articles` storage, and the **`match_law_articles`** RPC used for retrieval. |
| CLI tools | Use **`npx prisma`** and **`npx tsx`** (or `npm run` scripts); installing dependencies supplies Prisma and `tsx` locally — you do not need global installs. |

## Quick start

Run every step in order from an empty clone.

```bash
git clone https://github.com/lethanhdat1567/Lawer-api.git
cd Lawer-api
npm install
```

`npm install` runs **`prisma generate`** via the `prepare` script; if that fails, fix the error before continuing.

```bash
cp .env.example .env
```

Edit **`.env`**: set **`DATABASE_URL`** to a reachable MySQL database you created (same database name as in the URL), set **`SUPABASE_URL`** and **`SUPABASE_SERVICE_ROLE_KEY`**, and set **`JWT_ACCESS_SECRET`** / **`JWT_REFRESH_SECRET`** (or **`JWT_SECRET`** for both). If you use email verification, password reset, or Firebase sign-in, fill the matching blocks in [Environment variables](#environment-variables). For LLM calls, set the API key(s) for whatever provider your deployed model IDs use (chat/blog read the model string from MySQL `schedule_blog_system.model` — pick keys that match that provider).

```bash
npx prisma migrate dev
npm run dev
```

**`npx prisma migrate dev`** applies migrations to the database in **`DATABASE_URL`**; use a dedicated local schema for development.

When the server starts successfully, the process prints:

```text
Listening on http://localhost:4000
```

## Environment variables

### Database

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `NODE_ENV` | No | `development`, `production`, or `test`; affects behaviors such as strict SMTP checks in production. | `development` |
| `PORT` | No | HTTP listen port for `src/server.ts` (default **4000**). ⚠️ Mismatch with `NEXT_PUBLIC_API_BASE_URL` breaks local UI integration. | `4000` |
| `DATABASE_URL` | Yes | MySQL connection URL for Prisma Client and migrations (`prisma.config.ts`). ⚠️ A wrong host, port, database name, or credentials causes connection errors or an empty schema. | `mysql://user:password@127.0.0.1:3306/lawyerai` |
| `DB_USER` | For backups only | MySQL user for scheduled `mysqldump` in `src/schedules/backupDB.ts`. | `root` |
| `DB_PASSWORD` | For backups only | Password for `DB_USER`. | `secret` |
| `DB_NAME` | For backups only | Database name passed to `mysqldump`. ⚠️ Must match the database you back up. | `lawyerai` |

### Supabase

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `SUPABASE_URL` | Yes | Supabase project URL for `law_articles` and RPC calls. ⚠️ A typo here breaks RAG and embedding updates with client-side errors that can look like “no results”. | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key for server-side access (including **`match_law_articles`**). ⚠️ Using the anon key or a wrong key causes silent empty matches or permission failures. | `your-service-role-key` |

### Auth

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `JWT_ACCESS_SECRET` | Yes† | Secret for access tokens (or set `JWT_SECRET` instead). | `change-me-access` |
| `JWT_REFRESH_SECRET` | Yes† | Secret for refresh tokens (or set `JWT_SECRET` instead). | `change-me-refresh` |
| `JWT_SECRET` | Yes† | Single secret used for both access and refresh if the split secrets are omitted. ⚠️ Changing secrets invalidates existing tokens without warning. | `change-me-single-secret` |
| `JWT_ACCESS_EXPIRES_IN` | No | Access token lifetime (`jsonwebtoken` `expiresIn`). | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token lifetime. | `7d` |
| `FRONTEND_URL` | No | Allowed CORS origin and base for links in emails. ⚠️ Must match the browser origin exactly or the UI appears to “fail” with CORS errors. | `http://localhost:3000` |
| `FIREBASE_PROJECT_ID` | If using Firebase auth | Firebase project ID for ID token verification. | `your-project-id` |
| `FIREBASE_CLIENT_EMAIL` | If using Firebase auth | Service account email. | `firebase-adminsdk@...iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | If using Firebase auth | Private key PEM; use literal `\n` for newlines in `.env`. ⚠️ Malformed keys fail Firebase verification at runtime. | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` |
| `EMAIL_VERIFICATION_TTL_HOURS` | No | Hours until email verification tokens expire. | `48` |
| `PASSWORD_RESET_TTL_MINUTES` | No | Minutes until password reset tokens expire. | `30` |
| `AUTH_RATE_LIMIT_WINDOW_MS` | No | Auth route rate limit window override. | — |
| `AUTH_RATE_LIMIT_MAX` | No | Max requests per window for auth routes. | — |
| `RATE_LIMIT_WINDOW_MS` | No | General API rate limit window override. | — |
| `RATE_LIMIT_MAX` | No | Max requests per window for general API. | — |

† You must set either **`JWT_ACCESS_SECRET` + `JWT_REFRESH_SECRET`** or **`JWT_SECRET`**.

### AI/LLM

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | When using Google models | Provider key for Gemini-style model IDs configured in `schedule_blog_system.model` or fallbacks. ⚠️ Missing keys fail generation at request time. | — |
| `OPENAI_API_KEY` | When using OpenAI models | Provider key for OpenAI-compatible model IDs. ⚠️ Missing keys fail generation at request time. | — |
| `AI_GATEWAY_API_KEY` | When using AI Gateway | Key for Vercel AI Gateway if your model strings route through it. | — |

### Email

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `SMTP_HOST` | In production if sending mail | SMTP host; in **`production`**, missing SMTP triggers a startup error when the email module loads. | `smtp.example.com` |
| `SMTP_PORT` | If using SMTP | SMTP port. | `587` |
| `SMTP_SECURE` | No | `true` for TLS; otherwise `false` is typical on port 587. | `false` |
| `SMTP_USER` | If your SMTP server requires auth | Username. | — |
| `SMTP_PASS` | If your SMTP server requires auth | Password. | — |
| `EMAIL_FROM` | If using SMTP | From address for outgoing mail. | `noreply@example.com` |

### Storage

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `UPLOAD_DIR` | No | Override directory for uploaded images (see `src/lib/uploadPaths.ts`). | — |
| `UPLOAD_MAX_BYTES` | No | Max upload size in bytes (default 5 MiB). | `5242880` |
| `GOOGLE_CLIENT_ID` | For Drive backup | OAuth client for scheduled DB upload to Google Drive. | — |
| `GOOGLE_CLIENT_SECRET` | For Drive backup | OAuth client secret. | — |
| `GOOGLE_CLIENT_REFRESH_TOKEN` | For Drive backup | Refresh token for Drive API. | — |
| `GOOGLE_DRIVE_FOLDER_ID` | For Drive backup | Target Drive folder ID. ⚠️ Wrong ID sends backups nowhere useful. | — |

## API reference

Base path for versioned routes: **`/api/v1`**. Authenticated routes expect **`Authorization: Bearer <access_token>`** unless noted. Admin routes require an **`ADMIN`** role. Responses use the app’s `success` / `error` helpers where applicable; streaming chat returns a text stream instead of JSON.

**Auxiliary:** `GET /health` and `GET /api/v1/health` return JSON after pinging MySQL, e.g. `{ "status": "ok", "database": "connected" }`. Authenticated upload: `POST /api/v1/upload/image` (multipart field **`file`**). Public profile: `GET /api/v1/profiles/:username`. Leaderboard: `GET /api/v1/contributors/leaderboard`. Lawyer verification (user): `GET|POST|PATCH /api/v1/lawyer-verifications/me`. Blog ideas & schedule (admin): `/api/v1/blog-idea`, `/api/v1/blog-schedule`.

### Auth

| Method | Path | Auth | Request (key fields) | Response (key fields) |
| --- | --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | No | Email, password, display fields per validator | User + tokens or verification flow |
| POST | `/api/v1/auth/login` | No | Credentials | Access + refresh tokens |
| POST | `/api/v1/auth/refresh` | No | Refresh token body | New tokens |
| POST | `/api/v1/auth/logout` | No | Per controller | Acknowledgement |
| GET | `/api/v1/auth/verify-email` | No | Query token | Redirect / message |
| POST | `/api/v1/auth/forgot-password` | No | Email | Status message |
| POST | `/api/v1/auth/reset-password` | No | Token + new password | Status message |
| POST | `/api/v1/auth/firebase` | No | Firebase ID token | App JWT pair |
| GET | `/api/v1/auth/me` | Optional Bearer | — | Current user if token valid |
| PATCH | `/api/v1/auth/profile` | Yes | Profile fields | Updated profile |

```bash
curl -s -X POST "http://localhost:4000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"you@example.com\",\"password\":\"your-password\"}"
```

### Chat

| Method | Path | Auth | Request (key fields) | Response (key fields) |
| --- | --- | --- | --- | --- |
| POST | `/api/v1/chat-ai/` | Optional | `message` (string, required); `sessionId` when logged in | **Streaming** text/plain (Vercel AI SDK stream) |
| GET | `/api/v1/chat-ai/sessions` | Yes | Query `search` optional | Session list |
| GET | `/api/v1/chat-ai/sessions/:sessionId` | Yes | — | Session + messages |
| POST | `/api/v1/chat-ai/sessions` | Yes | Per controller | New session |
| PATCH | `/api/v1/chat-ai/sessions/:sessionId` | Yes | Title / metadata | Updated session |
| DELETE | `/api/v1/chat-ai/sessions/:sessionId` | Yes | — | Deletion result |

```bash
curl -N -X POST "http://localhost:4000/api/v1/chat-ai/" \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Điều 5 Luật dân sự quy định gì?\"}"
```

### Hub

| Method | Path | Auth | Request (key fields) | Response (key fields) |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/hub/categories` | No | — | Categories |
| GET | `/api/v1/hub/posts` | No | Pagination / filters per controller | Post list |
| GET | `/api/v1/hub/posts/slug/:slug` | No | — | Single post |
| GET | `/api/v1/hub/me/posts` | Yes | — | Current user’s posts |
| POST | `/api/v1/hub/me/posts` | Yes | Post body | Created post |
| GET | `/api/v1/hub/me/posts/:id` | Yes | — | Post detail |
| PATCH | `/api/v1/hub/me/posts/:id` | Yes | Fields to update | Updated post |
| DELETE | `/api/v1/hub/me/posts/:id` | Yes | — | Deletion result |
| POST | `/api/v1/hub/me/posts/:postId/comments` | Yes | Comment body | Comment |
| PATCH | `/api/v1/hub/me/posts/:postId/comments/:commentId` | Yes | Body | Updated comment |
| DELETE | `/api/v1/hub/me/posts/:postId/comments/:commentId` | Yes | — | Deletion result |
| POST | `/api/v1/hub/me/posts/:postId/comments/:commentId/like` | Yes | — | Like state |
| GET | `/api/v1/hub/me/comment-likes-batch` | Yes | Query params per controller | Batch like data |

```bash
curl -s "http://localhost:4000/api/v1/hub/posts"
```

### Blog

| Method | Path | Auth | Request (key fields) | Response (key fields) |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/blog/tags` | No | — | Tags |
| GET | `/api/v1/blog/posts` | No | Filters per controller | Post list |
| GET | `/api/v1/blog/posts/slug/:slug` | No | — | Public post |
| GET | `/api/v1/blog/me/posts` | Yes | — | Current user’s posts |
| POST | `/api/v1/blog/me/posts` | Yes | Post body | Created post |
| GET | `/api/v1/blog/me/posts/:id` | Yes | — | Post detail |
| PATCH | `/api/v1/blog/me/posts/:id` | Yes | Fields | Updated post |
| DELETE | `/api/v1/blog/me/posts/:id` | Yes | — | Deletion result |
| GET | `/api/v1/blog/me/saved-posts` | Yes | — | Saved posts |
| POST | `/api/v1/blog/me/posts/:postId/comments` | Yes | Body | Comment |
| PATCH | `/api/v1/blog/me/posts/:postId/comments/:commentId` | Yes | Body | Updated comment |
| DELETE | `/api/v1/blog/me/posts/:postId/comments/:commentId` | Yes | — | Deletion |
| POST | `/api/v1/blog/me/posts/:postId/comments/:commentId/like` | Yes | — | Like |
| POST | `/api/v1/blog/me/posts/:postId/like` | Yes | — | Like |
| POST | `/api/v1/blog/me/posts/:postId/save` | Yes | — | Save |
| GET | `/api/v1/blog/me/posts/:postId/engagement` | Yes | — | Engagement |
| GET | `/api/v1/blog/me/engagement-batch` | Yes | Query | Batch engagement |
| GET | `/api/v1/blog/me/comment-likes-batch` | Yes | Query | Batch likes |

```bash
curl -s "http://localhost:4000/api/v1/blog/posts"
```

### Admin

| Method | Path | Auth | Request (key fields) | Response (key fields) |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/admin/stats` | Admin | — | Dashboard stats |
| GET | `/api/v1/admin/ai-config` | Admin | — | AI config rows |
| PATCH | `/api/v1/admin/ai-config` | Admin | Partial config | Updated config |
| POST | `/api/v1/admin/crawl` | Admin | Crawl draft payload | Job / status |
| GET | `/api/v1/admin/users` | Admin | Query | User list |
| PATCH | `/api/v1/admin/users/:id` | Admin | Role / fields | Updated user |
| GET | `/api/v1/admin/lawyer-verifications` | Admin | Query | Verifications |
| PATCH | `/api/v1/admin/lawyer-verifications/:id` | Admin | Status / fields | Updated row |
| GET | `/api/v1/admin/leaderboard` | Admin | Query | Leaderboard data |
| GET | `/api/v1/admin/hub/posts` | Admin | Query | Hub posts |
| POST | `/api/v1/admin/hub/posts` | Admin | Body | Created |
| GET | `/api/v1/admin/hub/posts/:id` | Admin | — | Detail |
| PATCH | `/api/v1/admin/hub/posts/:id` | Admin | Body | Updated |
| DELETE | `/api/v1/admin/hub/posts/:id` | Admin | — | Deleted |
| POST | `/api/v1/admin/hub/categories` | Admin | Body | Category |
| PATCH | `/api/v1/admin/hub/categories/:id` | Admin | Body | Updated |
| DELETE | `/api/v1/admin/hub/categories/:id` | Admin | — | Deleted |
| GET | `/api/v1/admin/blog/posts` | Admin | Query | Posts |
| POST | `/api/v1/admin/blog/posts` | Admin | Body | Created |
| GET | `/api/v1/admin/blog/posts/:id` | Admin | — | Detail |
| PATCH | `/api/v1/admin/blog/posts/:id` | Admin | Body | Updated |
| PATCH | `/api/v1/admin/blog/posts/:id/verification` | Admin | Verification fields | Updated |
| DELETE | `/api/v1/admin/blog/posts/:id` | Admin | — | Deleted |
| POST | `/api/v1/admin/blog/tags` | Admin | Body | Tag |
| PATCH | `/api/v1/admin/blog/tags/:id` | Admin | Body | Updated |
| DELETE | `/api/v1/admin/blog/tags/:id` | Admin | — | Deleted |

```bash
curl -s "http://localhost:4000/api/v1/admin/stats" \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

## Architecture (RAG flow)

The service uses **hybrid persistence**: **Prisma 7** on **MySQL** holds users, hub, blog, assistant sessions, AI configuration, the job queue, crawls, and related domain data. **Supabase** (Postgres) stores **`law_articles`** and exposes the **`match_law_articles`** RPC for vector similarity over stored embeddings. The **Vercel AI SDK** (`ai` package) drives **`streamText`** / **`generateText`** for chat, hub feedback, and blog automation; the active **model string** comes from the first **`ScheduleBlogSystem`** row’s **`model`** field when generating chat and blog output.

**Indexing.** Queue workers dequeue **`AI_EMBEDDING_QUEUE`** jobs that reference Supabase `law_articles` rows. The worker loads each row, runs **`@xenova/transformers`** with `pipeline("feature-extraction", "Xenova/paraphrase-multilingual-MiniLM-L12-v2")`, applies **mean pooling** and **L2 normalization** on the concatenated law metadata and content, and writes the resulting **`embedding`** vector back to the same row.

**Retrieval.** For chat, the service optionally detects **“Điều N”** in the user question; when it matches, it queries **`law_articles`** by **`article_title`** (case-insensitive filters, limited rows). It always embeds the user question with the same Xenova pipeline, calls **`match_law_articles`** with **`match_threshold: 0.5`** and **`match_count: 8`**, merges exact hits ahead of vector hits, **dedupes by `id`**, and caps the combined context list at **10** articles. Hub AI feedback reuses the RPC with **`match_count: 10`** and the same threshold.

**Prompting.** Prompt copy is loaded from **`AiConfig`** rows via type keys — e.g. **`advisor`** for the assistant, **`community`** for hub AI, **`blog`** for blog flows — and retrieved articles are formatted into a single context block passed into the model.

**Generation and HTTP.** The assembled prompt is sent to the configured LLM; assistant replies stream over HTTP with proxy-friendly headers (e.g. **`X-Accel-Buffering: no`**). When a **`sessionId`** is present for an authenticated user, the finished assistant text is persisted as a chat message.

```text
User
  |
  v
API (Express)
  |
  +--> Embedding (Xenova: mean pool + L2 norm)
  |         |
  |         v
  +--------> Supabase RPC `match_law_articles` --> law context
  |
  v
LLM (Vercel AI SDK `streamText` / `generateText`)
  |
  v
Streaming text response (client)
```

## Project structure

```text
LawerAI-api/
├── prisma/
│   ├── schema.prisma          # Declares MySQL models and enums used across the app.
│   ├── migrations/              # Versioned SQL migrations applied by Prisma.
│   └── seed.ts                  # Optional seed script for local or staging data.
├── prisma.config.ts             # Prisma 7 datasource URL and migrate/generate wiring.
├── generated/prisma/            # Generated Prisma Client output (created by `prisma generate`).
└── src/
    ├── server.ts                # Connects Prisma, creates the app, listens on PORT.
    ├── app.ts                   # Express app: security, CORS from FRONTEND_URL, JSON, `/api/v1`.
    ├── queue.ts                 # Polls MySQL queue jobs: email, hub AI feedback, embeddings.
    ├── schedule.ts              # Registers cron tasks: uploads cleanup, DB backup, blog AI.
    ├── constants/               # Shared enums for queues, HTTP status, and error codes.
    ├── controllers/           # HTTP handlers that parse input and call services.
    ├── middlewares/           # Auth, rate limits, errors, and response helpers.
    ├── routes/                  # Routers grouped into public, user, admin, and system mounts.
    ├── schedules/             # Cron task implementations such as backup and blog generation.
    ├── services/                # Domain logic, RAG, AI streaming, email, and admin subdomains.
    ├── validators/              # Zod schemas for request validation.
    ├── lib/                     # Prisma, Supabase, Firebase Admin, uploads, and parsers.
    └── types/                   # Shared TypeScript types.
```

## Scripts

| Script | Purpose | When to use |
| --- | --- | --- |
| `npm run dev` | Runs `tsx watch src/server.ts`. | Daily local API development with auto-reload. |
| `npm run schedule` | Runs `tsx watch src/schedule.ts`. | When you need cron tasks (backup, blog AI, cleanup) locally or in a dedicated process. |
| `npm run queue` | Runs `tsx watch src/queue.ts` (initializes Xenova on startup). | Whenever embedding, email, or hub AI jobs must be processed from `QueueJob`. |
| `npm run build` | `tsc` compile to `dist/`. | Production build or CI compile check. |
| `npm start` | `node dist/src/server.js`. | Run the compiled API in production. |
| `npm run start:queue` | `node dist/src/queue.js`. | Production queue worker after `npm run build`. |
| `npm run start:schedule` | `node dist/src/schedule.js`. | Production scheduler worker after `npm run build`. |
| `npm run prisma:generate` | `prisma generate`. | Regenerate the client after schema changes if `prepare` did not run. |
| `npm run prisma:migrate` | `prisma migrate dev`. | Apply migrations during development. |
| `npm run prisma:validate` | `prisma validate`. | CI or pre-commit schema checks. |
| `npm run prisma:status` | `prisma migrate status`. | Inspect migration drift before deploy. |
| `npm run verify:deploy` | Generate, validate, then `tsc`. | Pre-deploy verification pipeline. |
| `npm run prisma:studio` | `prisma studio`. | Browse and edit MySQL data through Prisma’s UI. |
| `npm run format` / `format:check` | Prettier write / check. | Format or lint-style consistency for the repo. |

## Troubleshooting

### Xenova model fails to download on first run

The embedding pipeline downloads **`Xenova/paraphrase-multilingual-MiniLM-L12-v2`** on first use. If download fails (corporate proxy, offline machine, or TLS issues), set `HF_HOME` or `TRANSFORMERS_CACHE` to a writable directory, retry on a network that can reach Hugging Face CDN, or pre-seed the cache on another machine and copy it. Run the **queue** worker only after the model loads successfully.

### Supabase `match_law_articles` RPC not found

Create the RPC and **`pgvector`** extension in the Supabase project SQL editor, deploy the same function name the client calls, and verify **`SUPABASE_URL`** / **`SUPABASE_SERVICE_ROLE_KEY`** point at that project. ⚠️ A missing RPC often surfaces as retrieval returning no law context while the rest of the API still responds.

### Prisma client not generated

Run **`npx prisma generate`** (or **`npm install`**, which triggers **`prepare`**). Ensure **`DATABASE_URL`** is set so tooling that touches Prisma can run, and that `generated/prisma` is writable. If imports fail on `generated/prisma`, regenerate after any **`schema.prisma`** change.

### MySQL connection refused

Confirm MySQL listens on the host/port in **`DATABASE_URL`**, the database exists, and credentials match. Check firewalls and Docker port mapping. The health endpoint runs `SELECT 1`; if it fails, fix connectivity before debugging higher layers.

### Embedding queue jobs stuck in pending

Ensure **`npm run queue`** (or **`npm run start:queue`** in production) is running, **`DATABASE_URL`** is correct, and Supabase credentials allow updates to **`law_articles`**. Inspect the **`QueueJob`** table for failed or stale rows; restart the worker after fixing Xenova or network issues so jobs can dequeue and complete.
