Làm quen với **Interface** trong React (sử dụng TypeScript). Định nghĩa "khuôn mẫu" cho dữ liệu và hiển thị danh sách ra màn hình một cách đơn giản.

---

### PHẦN 1: ĐỀ BÀI

**Bài tập 1: Quản lý danh sách Thú cưng (Pet List)**
*   **Yêu cầu:**
    1. Định nghĩa một Interface tên là `Pet` gồm các trường: `name` (chuỗi) và `age` (số).
    2. Tạo một mảng dữ liệu gồm 3 thú cưng tuân thủ Interface `Pet` đã tạo.
    3. Sử dụng hàm `.map()` với Arrow Function để hiển thị danh sách này dưới dạng: **"Tên: [name] - Tuổi: [age]"** trong các thẻ `<li>`.

**Bài tập 2: Danh sách điện thoại (Smartphone Store)**
*   **Yêu cầu:**
    1. Định nghĩa một Interface tên là `Phone` gồm các trường: `model` (chuỗi), `brand` (chuỗi), và `price` (số).
    2. Tạo một mảng dữ liệu `phones` kiểu `Phone[]`.
    3. Hiển thị danh sách này trong các thẻ `<div>`. Mỗi thẻ `<div>` hiển thị thông tin: **"[Brand] [Model] - Giá: [Price] $"**.

**Bài tập 3: Trạng thái đơn hàng (Order Status)**
*   **Yêu cầu:**
    1. Định nghĩa một Interface tên là `Order` gồm: `id` (số), `productName` (chuỗi), và `isDelivered` (kiểu đúng/sai - boolean).
    2. Tạo mảng dữ liệu `orders` tuân thủ Interface trên.
    3. Sử dụng `.map()` để hiển thị: **"Đơn hàng [productName]: [Trạng thái]"**.
       *(Nếu isDelivered là true thì hiện "Đã giao", ngược lại hiện "Chưa giao")*.

---

### Lưu ý:

1.  **Dấu hiệu nhận biết:** Interface là cách chúng ta đặt tên cho "cấu trúc dữ liệu". Nếu bạn khai báo một biến kiểu `Pet` mà lại cho thêm trường `color` vào, TypeScript sẽ báo lỗi ngay vì `color` không nằm trong "bản thiết kế" `Pet`.
2.  **Lợi ích khi code:** Khi gõ `pet.` hoặc `order.`, chú ý vào danh sách gợi ý hiện ra. Đó chính là nhờ Interface đã định nghĩa sẵn các thuộc tính.
3.  **Tệp tin:** Các ví dụ này cần được viết trong file có đuôi `.tsx` để trình biên dịch TypeScript hoạt động.