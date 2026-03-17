# CẤU TRÚC VÀ THÀNH PHẦN CƠ BẢN TRONG REACT (TYPESCRIPT)

## 1. Khái niệm về Component
Component là đơn vị xây dựng cơ bản của một ứng dụng React. Có thể hiểu Component là một hàm JavaScript/TypeScript trả về giao diện (JSX). Việc chia nhỏ ứng dụng thành các Component giúp mã nguồn dễ quản lý, bảo trì và tái sử dụng.

### Cấu trúc cơ bản của một file Component (.tsx):
1.  **Phần Import:** Khai báo các thư viện hoặc component khác cần dùng.
2.  **Phần Định nghĩa kiểu (TypeScript):** Định nghĩa Interface cho Props (dữ liệu truyền vào).
3.  **Phần Logic:** Khai báo biến, State và các hàm xử lý.
4.  **Phần Render (return):** Trả về mã JSX (giao diện).
5.  **Phần Export:** Xuất component để các nơi khác có thể sử dụng.

---

## 2. Tạo và sử dụng một Component cơ bản
Đây là ví dụ về một component tĩnh, chỉ chứa HTML thuần túy và cách nhúng nó vào một component khác.

**File: `Header.tsx`**
```tsx
const Header = () => {
  return (
    <header style={{ backgroundColor: '#282c34', color: 'white', padding: '10px' }}>
      <h1>Tiêu đề Ứng dụng</h1>
      <nav>
        <ul>
          <li>Trang chủ</li>
          <li>Giới thiệu</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

**Sử dụng trong `App.tsx`:**
```tsx
import Header from './Header';

function App() {
  return (
    <div>
      <Header /> {/* Gọi Component như một thẻ HTML */}
      <main>
        <p>Nội dung chính của trang web.</p>
      </main>
    </div>
  );
}
```

---

## 3. Quản lý dữ liệu với Hook `useState`
`useState` là một Hook cho phép thêm trạng thái (State) vào các Functional Component. Khi giá trị của State thay đổi, React sẽ tự động render lại (re-render) component để cập nhật giao diện.

### Cấu trúc cú pháp:
`const [name, setName] = useState<Type>(initialValue);`

*   **`name`**: Tên biến trạng thái hiện tại.
*   **`setName`**: Hàm dùng để cập nhật giá trị cho biến trạng thái.
*   **`initialValue`**: Giá trị khởi tạo ban đầu.
*   **`<Type>`**: Định nghĩa kiểu dữ liệu (TypeScript).

**Ví dụ: Component tăng/giảm con số**
```tsx
import { useState } from 'react';

const Counter = () => {
  // Khai báo state 'count' kiểu số, khởi tạo bằng 0
  const [count, setCount] = useState<number>(0);

  const handleIncrease = () => {
    setCount(count + 1); // Cập nhật state mới
  };

  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      <h2>Bộ đếm: {count}</h2>
      <button onClick={handleIncrease}>Tăng số</button>
      <button onClick={() => setCount(count - 1)}>Giảm số</button>
    </div>
  );
};

export default Counter;
```

---

## 4. Xử lý tác vụ phụ với Hook `useEffect`
`useEffect` được sử dụng để thực hiện các "Side Effects" (tác động phụ) như: gọi API, thay đổi DOM thủ công, thiết lập bộ đếm thời gian (timer).

### Cấu trúc cú pháp:
`useEffect(callback, [dependencies]);`

*   **`callback`**: Hàm chứa logic muốn thực thi.
*   **`dependencies` (Mảng phụ thuộc):**
    *   Nếu là mảng rỗng `[]`: Hàm chỉ chạy **duy nhất một lần** sau khi component render lần đầu.
    *   Nếu có biến `[count]`: Hàm sẽ chạy lại mỗi khi giá trị của `count` thay đổi.
    *   Nếu không có mảng: Hàm chạy lại sau **mọi lần** render.

**Ví dụ: Thay đổi tiêu đề trình duyệt (Document Title)**
```tsx
import { useState, useEffect } from 'react';

const DocumentTitleChanger = () => {
  const [text, setText] = useState<string>("");

  // useEffect này chạy mỗi khi biến 'text' thay đổi
  useEffect(() => {
    document.title = text || "React App";
    console.log("Tiêu đề trình duyệt đã được cập nhật!");
  }, [text]);

  return (
    <div>
      <input 
        type="text" 
        placeholder="Nhập tiêu đề trang..." 
        onChange={(e) => setText(e.target.value)} 
      />
      <p>Giá trị hiện tại: {text}</p>
    </div>
  );
};

export default DocumentTitleChanger;
```

---

Dưới đây là nội dung bổ sung về **Virtual DOM** để hoàn thiện tài liệu hướng dẫn chuyên nghiệp về React.

---

## 5. CƠ CHẾ VIRTUAL DOM (DOM ẢO)

Để hiểu tại sao React có hiệu suất cao và hoạt động mượt mà, cần hiểu rõ về cơ chế **Virtual DOM**.

### 5.1. Vấn đề của Real DOM (DOM thật)
Trong phát triển web truyền thống (Vanilla JS), mỗi khi dữ liệu thay đổi, trình duyệt phải tính toán lại toàn bộ cấu trúc HTML, bố cục (layout) và vẽ lại giao diện. Thao tác trực tiếp trên Real DOM là một tác vụ "đắt đỏ" và chậm chạp, đặc biệt khi ứng dụng trở nên phức tạp với hàng ngàn phần tử.

### 5.2. Virtual DOM là gì?
Virtual DOM là một bản sao nhẹ (lightweight copy) của Real DOM dưới dạng đối tượng JavaScript. Nó không có khả năng thay đổi trực tiếp những gì người dùng nhìn thấy trên màn hình, nhưng nó chứa tất cả các chi tiết cần thiết để mô tả cấu trúc của giao diện.

### 5.3. Quy trình hoạt động của React (Reconciliation)

React xử lý cập nhật giao diện thông qua 3 bước chính:

1.  **Tạo bản sao mới (Render):** Khi `State` hoặc `Props` của một component thay đổi, React sẽ tạo ra một cây Virtual DOM mới để phản ánh trạng thái hiện tại của giao diện.
2.  **So sánh (Diffing):** React sử dụng một thuật toán tối ưu để so sánh cây Virtual DOM mới này với bản sao Virtual DOM ngay trước đó. Quá trình này giúp xác định chính xác những phần tử nào thực sự đã thay đổi.
3.  **Cập nhật tối thiểu (Patching):** Thay vì thay thế toàn bộ giao diện, React chỉ cập nhật những phần đã thay đổi vào Real DOM. Quá trình này diễn ra cực kỳ nhanh chóng và hiệu quả.

### 5.4. Lợi ích của Virtual DOM
*   **Tối ưu hiệu năng:** Giảm thiểu số lượng thao tác trực tiếp trên Real DOM, giúp ứng dụng chạy nhanh hơn.
*   **Trải nghiệm người dùng mượt mà:** Người dùng không nhận thấy sự gián đoạn hay hiện tượng "giật lag" khi dữ liệu được cập nhật liên tục (ví dụ: trong các ứng dụng chat hoặc bảng điều khiển chứng khoán).
*   **Đơn giản hóa lập trình:** Lập trình viên chỉ cần quan tâm đến trạng thái của dữ liệu (`State`), React sẽ tự động lo việc tính toán và cập nhật giao diện một cách hiệu quả nhất.
