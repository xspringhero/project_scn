# TRUYỀN DỮ LIỆU GIỮA COMPONENT CHA VÀ CON (TYPESCRIPT)
---

## 1. Component Con: `UserDisplay.tsx`

Component này có nhiệm vụ hiển thị thông tin nhận được từ Cha. Nó sử dụng **Props** để tiếp nhận một chuỗi (`name`) và một số (`count`).

```tsx
// 1. Định nghĩa kiểu dữ liệu cho các Props nhận vào
interface UserDisplayProps {
  displayName: string;    // Kiểu chuỗi (String)
  clickCount: number;     // Kiểu số (Number)
  onUpdateClick: () => void; // Hàm xử lý khi nhấn nút (không trả về giá trị)
}

const UserDisplay = ({ displayName, clickCount, onUpdateClick }: UserDisplayProps) => {
  return (
    <div style={{ border: '2px dashed #007bff', padding: '15px', marginTop: '10px' }}>
      <h3>Thông tin tại Component Con:</h3>
      
      {/* Hiển thị dữ liệu kiểu chuỗi nhận từ Cha */}
      <p>Tên người dùng: <strong>{displayName}</strong></p>
      
      {/* Hiển thị dữ liệu kiểu số nhận từ Cha */}
      <p>Số lần tương tác: <strong>{clickCount}</strong></p>

      {/* Khi nhấn nút, gọi hàm được truyền từ Cha xuống */}
      <button onClick={onUpdateClick}>
        Nhấn để tăng số lần tương tác
      </button>
    </div>
  );
};

export default UserDisplay;
```

---

## 2. Component Cha: `AppManager.tsx`

Component này quản lý dữ liệu gốc bằng **State**. Nó sẽ truyền giá trị của các State này xuống cho Component Con.

```tsx
import { useState } from 'react';
import UserDisplay from './UserDisplay'; // Import Component Con

const AppManager = () => {
  // KHỞI TẠO STATE
  // State kiểu chuỗi (String) để lưu tên
  const [name, setName] = useState<string>("Lập trình viên");
  
  // State kiểu số (Number) để lưu số lần nhấp
  const [count, setCount] = useState<number>(0);

  // Hàm xử lý logic tăng số lần nhấp
  const handleIncrement = () => {
    setCount(count + 1); // Cập nhật State kiểu số
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Quản lý Ứng dụng (Cha)</h1>
      
      {/* Ô nhập liệu để thay đổi State kiểu chuỗi */}
      <div style={{ marginBottom: '20px' }}>
        <label>Đổi tên người dùng: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <p>Dữ liệu tại Cha: {name} | {count}</p>

      {/* 
        GỌI COMPONENT CON VÀ TRUYỀN DỮ LIỆU QUA PROPS
        - displayName: truyền biến 'name' (chuỗi)
        - clickCount: truyền biến 'count' (số)
        - onUpdateClick: truyền hàm 'handleIncrement' 
      */}
      <UserDisplay 
        displayName={name} 
        clickCount={count} 
        onUpdateClick={handleIncrement} 
      />
    </div>
  );
};

export default AppManager;
```

---

## 3. Giải thích luồng hoạt động chuyên nghiệp

### A. Quản lý tại Component Cha (State)
*   **`name`**: Một biến trạng thái kiểu chuỗi. Khi người dùng nhập vào ô `input`, hàm `setName` được gọi, cập nhật giá trị mới cho `name`.
*   **`count`**: Một biến trạng thái kiểu số. Mỗi khi hàm `handleIncrement` chạy, giá trị của `count` tăng thêm 1 đơn vị thông qua `setCount`.

### B. Truyền xuống Component Con (Props)
*   Khi Component Cha render, nó chuyển giá trị hiện tại của `name` và `count` vào các thuộc tính (Props) tương ứng của Component Con là `displayName` và `clickCount`.
*   Component Con nhận các giá trị này thông qua tham số của hàm và hiển thị chúng ra màn hình.

### C. Phản hồi từ Con lên Cha
*   Component Con không có quyền trực tiếp thay đổi biến `count`.
*   Tuy nhiên, thông qua Prop `onUpdateClick`, nó kích hoạt hàm `handleIncrement` nằm ở Cha.
*   Khi hàm ở Cha chạy và cập nhật State, React sẽ tự động cập nhật lại (Re-render) cả Cha và Con để hiển thị con số mới nhất.

---

## 4. Tổng kết quy tắc Props và State trong ví dụ
1.  **State (tại Cha):** Đóng vai trò là "nguồn dữ liệu gốc". Có thể thay đổi được.
2.  **Props (tại Con):** Đóng vai trò là "bản sao dữ liệu" được truyền tới để hiển thị. Tại Component Con, các giá trị này là cố định (Read-only).
3.  **Sự tương tác:** Muốn thay đổi dữ liệu từ Component Con, phải thông qua một hàm (Callback function) được truyền từ Cha xuống.