# Cấu trúc Database Hệ thống Lawyer AI (RAG-Optimized)

Tài liệu này định nghĩa cấu trúc cơ sở dữ liệu trên Supabase (PostgreSQL) phục vụ lưu trữ văn bản pháp luật, tìm kiếm ngữ nghĩa (Semantic Search) và quản lý quy trình cào dữ liệu tự động.

## 1. Khởi tạo Extensions

Hệ thống sử dụng pgvector để tính toán độ tương đồng giữa các vector embedding và uuid-ossp để tự động hóa định danh.

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## 2. Hệ thống Bảng (Tables)

### A. Bảng categories (Danh mục Luật)

Mục đích: Phân loại vĩ mô các lĩnh vực luật để thu hẹp phạm vi tìm kiếm.

- id: Định danh UUID.
- name: Tên mảng luật (Ví dụ: "Luật Đất đai", "Luật Dân sự").
- slug: Dùng cho đường dẫn URL và lọc dữ liệu nhanh.

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### B. Bảng laws (Văn bản gốc)

Mục đích: Quản lý thực thể một bộ luật hoàn chỉnh và kiểm soát vòng đời hiệu lực.

- full_text_hash: Lưu mã băm SHA-256 của nội dung thô để so sánh khi cào lại.
- status: Trạng thái (active, expired, pending).
- law_number: Số hiệu văn bản (Ví dụ: 31/2024/QH15).

```sql
CREATE TABLE laws (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  law_number TEXT,
  issuing_date DATE,
  effective_date DATE,
  status TEXT DEFAULT 'active',
  raw_url TEXT,
  full_text_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### C. Bảng law_chunks (Phân mảnh dữ liệu Vector)

Mục đích: Lưu trữ các "đoạn tri thức" nhỏ (Điều/Khoản) phục vụ RAG.

- content: Nội dung văn bản định dạng Markdown.
- embedding: Vector đại diện (768 chiều cho Gemini text-embedding-004).
- metadata: JSONB chứa Chương, Mục, Tags, Tóm tắt.

```sql
CREATE TABLE law_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  law_id UUID REFERENCES laws(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  embedding VECTOR(768),
  metadata JSONB DEFAULT '{}'::jsonb,
  chunk_index INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

```sql
-- Tối ưu hóa tìm kiếm Vector bằng Index HNSW
CREATE INDEX ON law_chunks USING hnsw (embedding vector_cosine_ops);
```

### D. Bảng crawl_logs (Lịch sử cào)

Mục đích: Theo dõi tiến độ và Debug hệ thống Crawler.

```sql
CREATE TABLE crawl_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  status TEXT, -- 'success', 'failed', 'no_change'
  content_hash TEXT,
  error_message TEXT,
  crawled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 3. Hàm truy vấn Vector (RPC)

Dùng để tìm ra N đoạn luật liên quan nhất dựa trên câu hỏi của khách hàng.

```sql
CREATE OR REPLACE FUNCTION match_law_chunks (
  query_embedding VECTOR(768),
  match_threshold FLOAT,
  match_count INT,
  filter_category_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  law_id UUID,
  content TEXT,
  title TEXT,
  law_name TEXT,
  similarity FLOAT,
  metadata JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    lc.id,
    lc.law_id,
    lc.content,
    lc.title,
    l.title as law_name,
    1 - (lc.embedding <=> query_embedding) AS similarity,
    lc.metadata
  FROM law_chunks lc
  JOIN laws l ON lc.law_id = l.id
  WHERE (1 - (lc.embedding <=> query_embedding) > match_threshold)
    AND (l.status = 'active')
    AND (filter_category_id IS NULL OR l.category_id = filter_category_id)
  ORDER BY lc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```
