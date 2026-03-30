# Workflow: Hệ thống Thu thập & Số hóa Luật (Admin-Controlled AI)

## Mục tiêu nghiệp vụ

Hệ thống cho phép Admin chủ động toàn bộ vòng đời dữ liệu cào:

- Cấu hình model theo từng tác vụ xử lý.
- Cấu hình/chỉnh prompt trực tiếp trên giao diện.
- Nhập URL để cào và nhận bản nháp Markdown để review.
- Chỉnh sửa thủ công trước khi phê duyệt.
- Approve để đồng bộ dữ liệu vào Supabase và quản lý lịch sử các trang đã cào.

## Bước 1: Cấu hình Model & Prompt (System Config)

### 1) Quản lý Task và Model (bảng `system_configs`)

Lưu cấu hình mặc định theo từng công đoạn trong pipeline:

- `HTML_CLEANING`: Làm sạch HTML, chuyển cấu trúc nội dung.
- `CLASSIFICATION`: Phân loại lĩnh vực luật.
- `METADATA_EXTRACT`: Trích xuất metadata (chương/điều/tags/tóm tắt).
- `EMBEDDING`: Tạo vector embedding cho các chunk.

Admin có thể chọn model cho từng task (ví dụ Gemini Flash, GPT-4o, Claude, text-embedding model).

### 2) Quản lý Prompt theo tác vụ

Mỗi task có prompt tương ứng, quản trị từ Admin UI:

- `prompt_format`: Chuyển HTML sang Markdown đúng định dạng mong muốn.
- `prompt_classify`: Phân loại category từ nội dung.
- `prompt_summary`: Tạo mô tả/tóm tắt dễ hiểu.

Ngoài prompt mặc định, Admin có thể override prompt ngay tại màn hình cào cho từng lần chạy.

## Bước 2: Cào URL và tạo bản nháp (Draft Phase)

### Hành động của Admin

- Nhập URL trang cần cào.
- Chọn model cho phiên chạy (hoặc dùng mặc định hệ thống).
- (Tùy chọn) Chỉnh prompt input trực tiếp trước khi chạy.
- Nhấn nút cào để bắt đầu.

### Xử lý Backend (`/api/admin/crawl-draft`)

- Crawl HTML thô từ URL.
- Áp dụng config model/prompt theo task (hoặc giá trị override từ request).
- Chạy pipeline AI theo thứ tự:
    - HTML cleaning/format -> Markdown nháp.
    - Classification -> Category đề xuất.
    - Metadata extract -> metadata đề xuất.
- Trả kết quả bản nháp cho UI để Admin review.

## Bước 3: Hậu kiểm và chỉnh sửa (Human-in-the-loop)

### Hành động của Admin

- Chỉnh lại category nếu AI phân loại chưa đúng.
- Chỉnh sửa trực tiếp nội dung Markdown.
- Rà soát metadata (chương/điều/tags/tóm tắt).
- Xác nhận bản nháp đã đạt yêu cầu nghiệp vụ.

## Bước 4: Approve và đồng bộ Supabase (Sync Phase)

### Hành động của Admin

- Nhấn **Approve & Sync** khi bản nháp đã hoàn chỉnh.

### Xử lý Backend khi Approve

- Lưu/đồng bộ `categories` (tạo mới nếu chưa tồn tại).
- Lưu văn bản đã duyệt vào `laws` (bao gồm `raw_url`, `full_text_hash`, trạng thái hiệu lực).
- Chunk nội dung Markdown theo đơn vị phù hợp và lưu vào `law_chunks`.
- Sinh embedding cho từng chunk và cập nhật trường `embedding`.
- Ghi log vào `crawl_logs` cho từng lần cào/approve (`success`, `failed`, `no_change`).

## Quản lý các trang đã cào

Hệ thống phải theo dõi được lịch sử crawl theo URL để phục vụ quản trị:

- Tra cứu URL đã cào, thời điểm cào gần nhất, trạng thái lần cào gần nhất.
- Phát hiện nội dung không đổi qua `full_text_hash`/`content_hash` để đánh dấu `no_change`.
- Cho phép cào lại URL cũ và tạo bản nháp mới để review lại trước khi ghi đè dữ liệu đã publish.
- Khi recrawl và approve, dữ liệu `laws`/`law_chunks` phải được cập nhật nhất quán, tránh trùng lặp bản ghi.
