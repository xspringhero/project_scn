Chuyển đổi từ hàm thông thường sang hàm Lambda (Arrow Function) trong React.

---

### Bài tập 1: Khai báo Component (Hàm không tham số)
**Yêu cầu:** Chuyển đổi cách khai báo Component sau sang dạng Arrow Function.

*   **File:** `src/components/Header.jsx`
*   **Mã nguồn gốc:**
```jsx
function Header() {
  return (
    <header>
      <h1>Chào mừng đến với lớp học React</h1>
    </header>
  );
}

export default Header;
```

---

### Bài tập 2: Hàm xử lý sự kiện (Hàm không tham số)
**Yêu cầu:** Chuyển đổi cả Component và hàm `handleClick` bên trong sang dạng Arrow Function.

*   **File:** `src/components/AlertButton.jsx`
*   **Mã nguồn gốc:**
```jsx
import React from 'react';

function AlertButton() {
  function handleClick() {
    alert("Nút đã được nhấn!");
  }

  return (
    <button onClick={handleClick}>Click Me</button>
  );
}

export default AlertButton;
```

---

### Bài tập 3: Hàm có tham số
**Yêu cầu:** Chuyển đổi hàm `getMessage` sang dạng Arrow Function (sử dụng cách viết rút gọn nhất có thể).

*   **File:** `src/components/Welcome.jsx`
*   **Mã nguồn gốc:**
```jsx
import React from 'react';

function Welcome() {
  function getMessage(name) {
    return "Xin chào, " + name + "!";
  }

  return (
    <h2>{getMessage("Sinh viên")}</h2>
  );
}

export default Welcome;
```

---

### Bài tập 4: Hàm ẩn danh trực tiếp (Inline Function)
**Yêu cầu:** Chuyển đổi các hàm ẩn danh đang nằm trong thuộc tính `onClick` sang dạng Lambda (`=>`).

*   **File:** `src/components/InlineEvent.jsx`
*   **Mã nguồn gốc:**
```jsx
import React from 'react';

function InlineEvent() {
  function logMessage(text) {
    console.log(text);
  }

  return (
    <div>
      <button onClick={function() { logMessage("Hành động 1") }}>
        Nút 1
      </button>

      <button onClick={function() { logMessage("Hành động 2") }}>
        Nút 2
      </button>
    </div>
  );
}

export default InlineEvent;
```