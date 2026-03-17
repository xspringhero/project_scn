**Sử dụng hàm map** trong React

---

### PHẦN 1: ĐỀ BÀI

**Bài tập 1: Danh sách môn học (Mảng chuỗi)**
*   **Dữ liệu:** `["ReactJS", "Javascript", "HTML/CSS"]`
*   **Yêu cầu:** Sử dụng hàm `.map()` để hiển thị danh sách này bên trong các thẻ `<li>` của một thẻ `<ul>`.

Đây là các bài tập đã được cập nhật logic tính toán để sinh viên làm quen với việc xử lý dữ liệu ngay trong quá trình render bằng hàm `.map()` và **Arrow Function**.

---

**Bài tập 2: Hiển thị Họ và Tên (Ghép chuỗi)**
*   **Dữ liệu:**
    ```javascript
    const users = [
      { id: 1, firstName: "An", lastName: "Nguyễn Văn" },
      { id: 2, firstName: "Bình", lastName: "Trần Thị" },
      { id: 3, firstName: "Chi", lastName: "Lê Văn" }
    ];
    ```
*   **Yêu cầu:** Sử dụng hàm `.map()` để hiển thị danh sách người dùng. Với mỗi người, hiển thị một dòng `fullName` theo công thức: `lastName + firstName` (có khoảng trắng ở giữa).

**Bài tập 3: Tính toán giá thực tế (Xử lý số học)**
*   **Dữ liệu:**
    ```javascript
    const products = [
      { id: 101, name: "Điện thoại", price: 500, discount: 50 },
      { id: 102, name: "Laptop", price: 1500, discount: 200 },
      { id: 103, name: "Tai nghe", price: 100, discount: 10 }
    ];
    ```
*   **Yêu cầu:** Sử dụng hàm `.map()` để hiển thị thông tin sản phẩm. Với mỗi sản phẩm, hãy hiển thị:
    1. Tên sản phẩm.
    2. Giá gốc (`price`).
    3. Giá thực tế (`actual price`) sau khi đã trừ đi giảm giá (`discount`).

---

### Giải thích logic:

1.  **Xử lý dữ liệu:** Bạn có thể thực hiện bất kỳ phép tính nào (cộng chuỗi, trừ số) ngay bên trong dấu ngoặc nhọn `{}` của thẻ HTML.
2.  **Sự ngắn gọn của Lambda:**
    *   Ở bài 2, thay vì viết một hàm dài dòng, ta chỉ cần gọi `{user.lastName} {user.firstName}`.
    *   Ở bài 3, phép tính `{p.price - p.discount}` được thực hiện tức thì cho từng phần tử khi React duyệt qua mảng.
3.  **Dấu ngoặc tròn `( )` sau mũi tên `=>`:**
    *   Khi nội dung render của bạn có nhiều thẻ HTML lồng nhau (như bài 3 có 1 thẻ `div` bọc nhiều thẻ `p`), hãy sử dụng dấu ngoặc tròn để bao bọc toàn bộ khối HTML đó. Nó giúp Arrow Function hiểu rằng toàn bộ khối này là kết quả trả về.