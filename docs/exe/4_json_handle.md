### CẤU TRÚC DỮ LIỆU JSON

#### Nhắc lại quy tắc JSON:
*   Dữ liệu nằm trong cặp ngoặc nhọn `{ }` (đối tượng) hoặc ngoặc vuông `[ ]` (mảng).
*   Các trường dữ liệu (Key) phải nằm trong **dấu ngoặc kép**: `"name"`, `"age"`.
*   Các kiểu dữ liệu có thể dùng:
    *   `"Chuỗi"` (String)
    *   `123` (Số - Number)
    *   `true / false` (Đúng/Sai - Boolean)
    *   `[ ]` (Mảng - Danh sách)
    *   `{ }` (Đối tượng con lồng bên trong)

---

#### BÀI TẬP: THIẾT KẾ CƠ SỞ DỮ LIỆU JSON CHO HỆ THỐNG GAME

**Yêu cầu:** Tạo 2 file JSON phục vụ cho việc quản lý một cửa hàng trò chơi trực tuyến. Các file này phải đảm bảo tính liên kết dữ liệu và tuân thủ đúng định dạng JSON.

---

#### 1. Yêu cầu tạo file

**File 1: `categories.json` (Danh mục Game)**
*   **Số lượng:** Ít nhất **5 bản ghi** (ví dụ: Hành động, Nhập vai, Thể thao...).
*   **Các trường cần thiết:**
    *   `id`: Mã định danh duy nhất (Số).
    *   `name`: Tên danh mục (Chuỗi).
    *   `description`: Mô tả ngắn gọn về danh mục này (Chuỗi).
    *   `totalGames`: Tổng số lượng game thuộc danh mục này hiện có (Số).

**File 2: `games.json` (Danh sách Game)**
*   **Số lượng:** Ít nhất **20 bản ghi** khác nhau.
*   **Các trường cần thiết:**
    *   `id`: Mã định danh duy nhất (Số).
    *   `title`: Tên trò chơi (Chuỗi).
    *   `price`: Giá tiền (Số).
    *   `categoryId`: Mã danh mục để liên kết với file `categories.json` (Số).
    *   `isFeatured`: Game này có phải là game nổi bật không? (Boolean: true/false).
    *   `platforms`: Danh sách các nền tảng hỗ trợ (Mảng các chuỗi, ví dụ: ["PC", "PS5", "Xbox"]).
    *   `rating`: Điểm đánh giá (Số, ví dụ: 4.5).
    *   `releaseDate`: Ngày phát hành (Chuỗi, ví dụ: "2023-10-25").

---

#### 3. Nhiệm vụ
1.  **Thiết kế:** Tự xây dựng danh sách 5 danh mục và 20 trò chơi khác nhau. Lưu ý giá trị `categoryId` trong file `games.json` phải khớp với `id` trong file `categories.json`.
2.  **Định dạng:** Đảm bảo toàn bộ nội dung file là một Mảng lớn `[ ]` bao quanh các đối tượng `{ }`.
3.  **Kiểm tra:** Các dấu phẩy `,` giữa các trường và các bản ghi phải chính xác. Không được để dư dấu phẩy ở bản ghi cuối cùng.