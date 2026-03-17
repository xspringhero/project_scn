### Bài giải 1: Hiển thị danh sách chuỗi đơn giản
**Yêu cầu:** Chuyển mảng môn học thành danh sách thẻ `<li>`.

```jsx
import React from 'react';

const LessonList = () => {
  const lessons = ["ReactJS", "Javascript", "HTML/CSS"];

  return (
    <div>
      <h3>Danh sách môn học:</h3>
      <ul>
        {/* 
          - 'lesson' là biến đại diện cho từng phần tử chuỗi trong mảng.
          - Mũi tên '=>' thay thế cho chữ function và return.
          - Vì chỉ có 1 dòng trả về nên không cần ngoặc nhọn {}.
        */}
        {lessons.map(lesson => (
          <li key={lesson}>{lesson}</li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
```

---

### Bài giải 2: Ghép chuỗi Họ và Tên (fullName)
**Yêu cầu:** Kết hợp `lastName` và `firstName` từ object người dùng.

```jsx
import React from 'react';

const UserFullNames = () => {
  const users = [
    { id: 1, firstName: "An", lastName: "Nguyễn Văn" },
    { id: 2, firstName: "Bình", lastName: "Trần Thị" },
    { id: 3, firstName: "Chi", lastName: "Lê Văn" }
  ];

  return (
    <div>
      <h3>Danh sách thành viên:</h3>
      {/* 
        - 'user' đại diện cho từng object trong mảng.
        - Ta truy cập các thuộc tính bằng dấu chấm (.).
        - Việc ghép chuỗi thực hiện trực tiếp giữa các dấu ngoặc nhọn {}.
      */}
      {users.map(user => (
        <p key={user.id}>
          Họ và tên: {user.lastName} {user.firstName}
        </p>
      ))}
    </div>
  );
};

export default UserFullNames;
```

---

### Bài giải 3: Tính toán giá sản phẩm (Actual Price)
**Yêu cầu:** Hiển thị giá thực tế bằng cách lấy `price - discount`.

```jsx
import React from 'react';

const ProductPricing = () => {
  const products = [
    { id: 101, name: "Điện thoại", price: 500, discount: 50 },
    { id: 102, name: "Laptop", price: 1500, discount: 200 },
    { id: 103, name: "Tai nghe", price: 100, discount: 10 }
  ];

  return (
    <div>
      <h3>Bảng giá chi tiết:</h3>
      {/* 
        - 'p' là biến đại diện cho từng sản phẩm.
        - Sử dụng ngoặc tròn '()' sau mũi tên '=>' để bao bọc khối HTML nhiều dòng.
        - Phép tính (p.price - p.discount) được thực hiện tự động cho mỗi phần tử.
      */}
      {products.map(p => (
        <div key={p.id} style={{ marginBottom: "20px", borderBottom: "1px solid gray" }}>
          <h4>Sản phẩm: {p.name}</h4>
          <p>Giá gốc: {p.price}$</p>
          <p>Giảm giá: {p.discount}$</p>
          <p>
            <strong>Giá thực tế: {p.price - p.discount}$</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductPricing;
```

---

### 💡 Các lưu ý quan trọng về Lambda (Arrow Function) trong bài giải:

1.  **Cú pháp rút gọn:** Bạn sẽ thấy chúng ta không dùng từ khóa `return` và cặp ngoặc nhọn `{}` bên trong hàm `.map()`. Đây gọi là **Implicit Return** (Tự động trả về), giúp code JSX cực kỳ gọn gàng.
2.  **Sử dụng Ngoặc tròn `( )`:** Trong Bài 3, chúng ta bọc khối HTML trong `( )`. Điều này nói với JavaScript rằng: "Toàn bộ khối HTML này là một giá trị duy nhất được trả về".
3.  **Xử lý Logic:**
    *   Mọi phép tính toán như `{p.price - p.discount}` hay ghép chữ `{user.lastName} {user.firstName}` đều phải nằm trong dấu ngoặc nhọn `{}` của JSX.
    *   Hàm Lambda giúp bạn giữ được phạm vi biến sạch sẽ, biến `p` hay `user` chỉ tồn tại bên trong lần lặp đó.
4.  **Thuộc tính `key`:**
    *   Ở bài 1: Dùng chính giá trị chuỗi làm `key` (vì các chuỗi khác nhau).
    *   Ở bài 2 & 3: Dùng `id` của đối tượng làm `key`. Đây là cách chuẩn nhất trong React để tối ưu hiệu năng.

Trong React, việc dùng `key` khi lặp qua một danh sách (như dùng `.map()`) là **bắt buộc** (nếu bạn không muốn nhận cảnh báo lỗi từ React và muốn ứng dụng chạy ổn định).

### 1. Có nhất thiết phải dùng `key={lesson}` không?
**Về mặt kỹ thuật:** Nếu bạn bỏ `key`, code vẫn sẽ chạy và hiển thị ra giao diện. Tuy nhiên:
*   Trình duyệt (Console) sẽ hiện một cảnh báo đỏ: *"Warning: Each child in a list should have a unique 'key' prop."*
*   Hiệu năng ứng dụng sẽ bị ảnh hưởng khi danh sách thay đổi (thêm, xóa, hoặc sắp xếp lại).

### 2. Ý nghĩa của `key` là gì?

Hãy tưởng tượng React giống như một người quản lý kho. Khi bạn thay đổi danh sách (ví dụ: đổi vị trí môn "Javascript" lên đầu), React cần biết chính xác thẻ `<li>` nào là của môn nào để cập nhật.

#### a. Xác định danh tính phần tử (Reconciliation)
React không xóa sạch cả danh sách rồi vẽ lại từ đầu (vì như vậy rất chậm). Thay vào đó, nó so sánh danh sách cũ và danh sách mới.
*   Nếu có `key`, React chỉ cần nhìn vào `key` để biết: *"À, cái ông 'ReactJS' này vẫn thế, chỉ có ông 'Javascript' là mới chuyển chỗ thôi"*.
*   Nó sẽ giữ nguyên các phần tử cũ và chỉ thay đổi những chỗ cần thiết. Điều này làm cho ứng dụng cực kỳ nhanh.

#### b. Giữ trạng thái của phần tử
Nếu các thẻ trong danh sách có chứa dữ liệu do người dùng nhập (như ô Input) hoặc có hiệu ứng (Animation), việc thiếu `key` hoặc dùng `key` sai sẽ khiến React nhầm lẫn.
*   *Ví dụ:* Bạn xóa dòng 1, nhưng vì không có `key`, React có thể tưởng bạn xóa dòng cuối và cập nhật sai nội dung của các dòng còn lại.

### 3. Tại sao ở bài 1 lại dùng `key={lesson}`?
Trong bài tập 1, dữ liệu là một mảng chuỗi đơn giản: `["ReactJS", "Javascript", "HTML/CSS"]`.
*   Vì các chuỗi này là **duy nhất** (không có 2 môn tên giống hệt nhau), nên ta dùng chính cái tên đó làm `key`.
*   **Lưu ý:** Nếu mảng có hai giá trị trùng nhau, ví dụ `["ReactJS", "ReactJS"]`, thì việc dùng `key={lesson}` sẽ gây lỗi vì `key` phải là duy nhất.

### 4. Quy tắc chọn `key` tốt nhất:
1.  **Ưu tiên 1 (Tốt nhất):** Dùng `id` từ cơ sở dữ liệu (ví dụ: `key={user.id}`, `key={p.id}`). Đây là giá trị không bao giờ thay đổi.
2.  **Ưu tiên 2 (Tạm ổn):** Dùng chính nội dung nếu bạn chắc chắn nó không bao giờ trùng (như ví dụ `lesson` ở trên).
3.  **Ưu tiên 3 (Hạn chế):** Dùng `index` (số thứ tự của mảng). Chỉ dùng khi danh sách là tĩnh (không bao giờ thêm, xóa, sắp xếp lại). Nếu danh sách thay đổi thường xuyên, dùng `index` làm `key` có thể gây ra các lỗi hiển thị rất khó hiểu.

**Tóm lại:** Hãy luôn luôn dùng `key`. Nó là "chứng minh nhân dân" để React quản lý các phần tử trong danh sách một cách chính xác và nhanh chóng.