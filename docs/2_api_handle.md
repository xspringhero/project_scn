### 1. Chuẩn bị API mẫu
Sử dụng API giả lập miễn phí từ: `https://jsonplaceholder.typicode.com/users`
Dữ liệu trả về sẽ là một danh sách người dùng có cấu trúc: `{ id, name, email }`.

---

### 2. Viết Code (File `App.tsx`)

Bạn hãy mở file `App.tsx` và thay thế bằng đoạn code sau:

```tsx
import { useState, useEffect } from 'react';

// Bước 1: Định nghĩa kiểu dữ liệu (Interface) cho dữ liệu từ API
interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  // Bước 2: Khai báo các State
  // <User[]> báo cho TypeScript biết đây là một mảng các User
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Bước 3: Hàm gọi API
const fetchUsers = () => {
    setIsLoading(true);
    setError(null);

    // 1. Khởi tạo đối tượng XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // 2. Cấu hình yêu cầu: Phương thức GET và URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

    // 3. Xử lý khi yêu cầu hoàn tất (onload)
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                // Parse dữ liệu từ chuỗi JSON sang Object/Array
                const data = JSON.parse(xhr.responseText);
                setUsers(data);
            } catch (e) {
                setError("Lỗi định dạng dữ liệu từ Server");
            }
        } else {
            // Xử lý các lỗi HTTP (404, 500, v.v.)
            setError(`Lỗi từ Server: ${xhr.status} - ${xhr.statusText}`);
        }
        setIsLoading(false);
    };

    // 4. Xử lý khi có lỗi kết nối mạng (onerror)
    xhr.onerror = function () {
        setError("Lỗi kết nối mạng. Không thể gọi API.");
        setIsLoading(false);
    };

    // 5. Gửi yêu cầu đi
    xhr.send();
};


    // Bước 4: Dùng useEffect để tự động gọi hàm fetchUsers khi component render lần đầu
  useEffect(() => {
    fetchUsers();
  }, []); // Mảng rỗng [] đảm bảo hàm này chỉ chạy 1 lần duy nhất

  // Bước 5: Render giao diện (View)
  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh sách người dùng (React + TS)</h1>

      {/* Hiển thị trạng thái Loading */}
      {isLoading && <p>Đang tải dữ liệu...</p>}

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

      {/* Hiển thị dữ liệu ra View dùng hàm .map() */}
      {!isLoading && !error && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li 
              key={user.id} 
              style={{ 
                border: '1px solid #ccc', 
                margin: '10px 0', 
                padding: '10px',
                borderRadius: '8px' 
              }}
            >
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
```

---

### 3. Giải thích các thành phần quan trọng

#### A. Interface `User`
Trong TypeScript, bạn phải mô tả dữ liệu API trông như thế nào. Điều này cực kỳ hữu ích: khi bạn gõ `user.` ở phần hiển thị, VS Code sẽ tự gợi ý cho bạn là có `.id`, `.name`, `.email`. Nếu bạn gõ `.age` (không có trong interface), nó sẽ báo lỗi ngay.

#### B. `useState<User[]>([])`
Chúng ta khởi tạo state là một mảng rỗng `[]`. `User[]` giúp TypeScript hiểu rằng: "Biến `users` này chỉ được chứa danh sách người dùng thôi nhé!".

#### C. `useEffect`
Đây là nơi bạn thực hiện các "Side Effect" (như gọi API, tương tác với server).
*   Cú pháp: `useEffect(hàm_xử_lý, [mảng_phụ_thuộc])`.
*   Vì chúng ta truyền vào mảng rỗng `[]`, nên React hiểu là: "Chỉ chạy hàm này một lần duy nhất ngay sau khi giao diện hiện ra".

#### D. Hàm `.map()`
Đây là cách phổ biến nhất trong React để hiển thị một danh sách. Nó duyệt qua mảng `users` và biến mỗi phần tử thành một đoạn mã HTML (JSX).
*   **Lưu ý về `key={user.id}`**: Mỗi phần tử trong danh sách khi render phải có một thuộc tính `key` duy nhất để React quản lý và cập nhật giao diện nhanh hơn.

---
