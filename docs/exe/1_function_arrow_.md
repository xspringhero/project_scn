Giải bài tập chuyển đổi sang dạng **Arrow Function (Lambda)**.

---

### Bài giải 1: Khai báo Component (Hàm không tham số)
**Nội dung:** Chuyển đổi định nghĩa Component.

```jsx
// 1. Thay 'function Header()' bằng 'const Header = () =>'
const Header = () => {
  // Với Component đơn giản chỉ có return, ta có thể viết rút gọn hơn nữa (xem ở dưới)
  return (
    <header>
      <h1>Chào mừng đến với lớp học React</h1>
    </header>
  );
};

/* 
  Mẹo rút gọn (Implicit Return):
  const Header = () => (
    <header>
      <h1>Chào mừng đến với lớp học React</h1>
    </header>
  );
*/

export default Header;
```

---

### Bài giải 2: Hàm xử lý sự kiện (Hàm không tham số)
**Nội dung:** Chuyển đổi hàm lồng bên trong Component.

```jsx
import React from 'react';

// Chuyển Component chính thành Arrow Function
const AlertButton = () => {
  
  // Chuyển hàm xử lý bên trong thành Arrow Function
  // 'const' dùng để khai báo hàm như một biến, giúp tránh bị ghi đè
  const handleClick = () => {
    alert("Nút đã được nhấn!");
  };

  return (
    <button onClick={handleClick}>Click Me</button>
  );
};

export default AlertButton;
```

---

### Bài giải 3: Hàm có tham số
**Nội dung:** Sử dụng cú pháp rút gọn tối đa cho hàm có tham số.

```jsx
import React from 'react';

const Welcome = () => {
  // Chuyển getMessage thành Arrow Function rút gọn:
  // 1. Vì chỉ có 1 tham số 'name', ta có thể bỏ dấu ngoặc đơn ()
  // 2. Vì chỉ có 1 dòng return, ta bỏ dấu ngoặc nhọn {} và từ khóa 'return'
  const getMessage = name => "Xin chào, " + name + "!";

  return (
    <h2>{getMessage("Sinh viên")}</h2>
  );
};

export default Welcome;
```

---

### Bài giải 4: Hàm ẩn danh trực tiếp (Inline Function)
**Nội dung:** Chuyển đổi Lambda trực tiếp trong JSX (Cách viết phổ biến nhất khi truyền tham số).

```jsx
import React from 'react';

const InlineEvent = () => {
  // Chuyển hàm logMessage thành Arrow Function
  const logMessage = text => {
    console.log(text);
  };

  return (
    <div>
      {/* 
        Thay 'function() { logMessage("...") }' bằng '() => logMessage("...")'
        Cú pháp () => ... giúp tạo ra một hàm ẩn danh chạy ngay khi click
      */}
      <button onClick={() => logMessage("Hành động 1")}>
        Nút 1
      </button>

      <button onClick={() => logMessage("Hành động 2")}>
        Nút 2
      </button>
    </div>
  );
};

export default InlineEvent;
```

---

### 💡 Tổng kết các thay đổi quan trọng:

1.  **Từ khóa:** Bỏ `function`, thay bằng `const` và thêm dấu mũi tên `=>` sau tham số.
2.  **Dấu ngoặc đơn `()`:**
    *   Nếu không có tham số: Bắt buộc phải có `() => ...`
    *   Nếu có 1 tham số: Có thể viết `name => ...` (không cần ngoặc).
    *   Nếu có từ 2 tham số trở lên: Bắt buộc phải có `(a, b) => ...`
3.  **Dấu ngoặc nhọn `{}` và `return`:**
    *   Nếu hàm chỉ có **một dòng lệnh trả về giá trị**, bạn có thể bỏ cả `{}` và `return`. Đây gọi là **Implicit Return**.
4.  **Inline (Viết trực tiếp):** Trong React, khi cần truyền tham số vào hàm xử lý sự kiện, cách viết `onClick={() => handle(param)}` là cách viết tiêu chuẩn và ngắn gọn nhất.