# LawyerAI — thiết kế cơ sở dữ liệu (MySQL)

Tài liệu bám **tổng quan UI** (tra cứu AI, hub thảo luận, blog Verified, tôn vinh đóng góp, RBAC). Dùng làm chuẩn khi viết `schema.prisma` và migration.

## Nguyên tắc

- **MySQL 8+**, **InnoDB**, **`utf8mb4`** / **`utf8mb4_unicode_ci`**.
- **Khóa chính:** `String` / `VARCHAR(36)` (UUID) hoặc **CUID** (~25 ký tự) — khớp rule Prisma repo (`@default(cuid())`).
- Mọi bảng domain chính: **`created_at`**, **`updated_at`**. Xóa nội dung user-generated dùng **xóa cứng** (`DELETE` / `prisma.*.delete`) theo quan hệ FK và cascade; không dùng cột `deleted_at`.
- **Pagination** mọi list; **transaction** cho luồng nhiều bước (duyệt luật sư + đổi role, bài + ledger, v.v.).
- **Embedding / vector search:** không bắt buộc lưu vector trong MySQL; có thể lưu `external_vector_id` và dùng dịch vụ RAG riêng.

---

## 1. Người dùng & xác minh luật sư

| Bảng                   | Mô tả                                                                                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `users`                | `id`, `email` (unique), `password_hash` (nullable nếu OAuth sau), `email_verified_at`, `role` enum: `USER`, `VERIFIED_LAWYER`, `ADMIN`.                                                                                                          |
| `profiles`             | `user_id` (FK unique): `username` (unique), `display_name`, `avatar_url`, `bio`, `contributor_opt_out` (boolean — không tham gia xếp hạng).                                                                                                      |
| `lawyer_verifications` | `user_id`, `status`: `PENDING`, `APPROVED`, `REJECTED`, `REVOKED`; `jurisdiction`, `bar_number`, `firm_name`; `reviewed_by_user_id`, `reviewed_at`, `note`; timestamps. |

**Luồng:** khi `APPROVED`, cập nhật `users.role = VERIFIED_LAWYER` trong cùng **transaction** với bản ghi verification.

---

## 2. Trợ lý tra cứu (phiên + tin nhắn + đánh giá)

| Bảng                        | Mô tả                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assistant_conversations`   | `user_id`, `title` (nullable); `created_at`, `updated_at`.                                                                                         |
| `assistant_messages`        | `conversation_id`, `role`: `USER` / `ASSISTANT` / `SYSTEM`, `content` (LONGTEXT), `metadata_json` (model, latency, danh sách tham chiếu nguồn — tránh PII thừa). |
| `assistant_message_ratings` | `message_id`, `user_id`, `value` (vd `UP`/`DOWN` hoặc 1–5); **unique** `(message_id, user_id)`.                                                                  |

---

## 3. Hub (bài + bình luận + AI oversight)

| Bảng                     | Mô tả                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hub_categories`         | `slug` (unique), `name`, `sort_order`; timestamps.                                                                                                                                                         |
| `hub_posts`              | `category_id` (nullable FK), `author_id`, `slug` (unique), `title`, `body`, `status` (`PUBLISHED`, `HIDDEN`, …); timestamps.                                                                               |
| `hub_comments`           | `post_id`, `parent_id` (nullable — cây), `author_id`, `body`; timestamps.                                                                                                                                  |

**Index gợi ý:** `hub_posts (category_id, created_at)`, `hub_comments (post_id, parent_id)`.

---

## 4. Blog (kho tri thức + tag + Verified)

| Bảng             | Mô tả                                                                                                                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blog_posts`     | `author_id`, `slug` (unique), `title`, `excerpt`, `body`, `status`: `DRAFT`, `PUBLISHED`; `is_verified`, `verified_at`, `verified_by_user_id` (nullable), `verification_notes`, `legal_corpus_version`; timestamps. |
| `tags`           | `slug` (unique), `name`.                                                                                                                                                                                                          |
| `blog_post_tags` | PK `(blog_post_id, tag_id)`.                                                                                                                                                                                                      |

**Index gợi ý:** `blog_posts (slug)`, `(is_verified, status, updated_at)` cho listing.

---

## 5. Uy tín & tôn vinh (hall of fame)

| Bảng                                           | Mô tả                                                                                                                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reputation_ledger`                            | `user_id`, `delta` (INT), `reason` enum (`HUB_REPLY_HELPFUL`, `BLOG_QUALITY`, `BLOG_POST_LIKED`, `BLOG_COMMENT_HELPFUL`, `MOD_ADJUSTMENT`); FK mềm optional: `ref_hub_comment_id`, `ref_blog_post_id`, `ref_blog_comment_id`; `created_at`. |
| `user_contribution_scores` _(tùy chọn, cache)_ | `user_id` (unique), `score`, `updated_at` — cập nhật bằng job/app sau mỗi ghi ledger.                                                                                        |
| `leaderboard_snapshots` _(tùy chọn)_           | `period_start`, `period_end`, `payload_json` (bảng xếp hạng đông lạnh theo tháng/quý).                                                                                       |

Người dùng bật **`profiles.contributor_opt_out`** thì **không** đưa vào bảng công khai.

---

## Sơ đồ quan hệ (rút gọn)

```
users 1—1 profiles
users 1—* lawyer_verifications

users 1—* assistant_conversations 1—* assistant_messages 1—* assistant_message_ratings

hub_categories 1—* hub_posts 1—* hub_comments (parent self)

users 1—* blog_posts *—* tags (qua blog_post_tags)

users 1—* reputation_ledger
users 1—0..1 user_contribution_scores

```

---

## Prisma

- **Prisma ORM 7:** file `prisma/schema.prisma` chỉ khai báo `provider` trong `datasource`; **URL** đặt trong **`prisma.config.ts`** (root repo). Client generate: `provider = "prisma-client"`, thư mục **`generated/prisma`** (import runtime theo [hướng dẫn upgrade v7](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7)).
- Map tên cột DB **`snake_case`** khi model dùng `camelCase`.
- Đổi tên migration mô tả rõ: vd `20260328_init_users_profiles`.

---

## Tham chiếu sản phẩm

Đặc tả UI / trang: `LawerAI-UI/DOCS/README.md`.
