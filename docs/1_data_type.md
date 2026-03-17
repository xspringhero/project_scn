# TỔNG QUAN CÁC KIỂU DỮ LIỆU TRONG TYPESCRIPT

TypeScript là một "siêu tập" (superset) của JavaScript, bổ sung hệ thống kiểm tra kiểu dữ liệu tĩnh. Việc sử dụng đúng kiểu dữ liệu giúp phát hiện lỗi ngay trong quá trình viết code (compile-time) thay vì chờ đến khi ứng dụng chạy (runtime).

---

## 1. Các kiểu dữ liệu cơ bản (Primitive Types)

Đây là những kiểu dữ liệu đơn giản và thường xuyên được sử dụng nhất trong các Component React.

```typescript
// Kiểu chuỗi (String)
let brandName: string = "Apple";

// Kiểu số (Number) - Dùng cho cả số nguyên và số thập phân
let price: number = 1500.50;
let quantity: number = 10;

// Kiểu logic (Boolean)
let isAvailable: boolean = true;

// Kiểu Null và Undefined
let data: null = null;
let error: undefined = undefined;
```

---

## 2. Kiểu Mảng (Array) và Tuple

TypeScript cung cấp hai cách chính để định nghĩa kiểu dữ liệu cho danh sách.

```typescript
// Cách 1: Sử dụng kiểu dữ liệu kèm []
let categories: string[] = ["Điện thoại", "Máy tính", "Phụ kiện"];
let scores: number[] = [8, 9, 10];

// Cách 2: Sử dụng Generic (Array<kiểu>)
let users: Array<string> = ["An", "Bình", "Chi"];

// Tuple: Mảng có số lượng phần tử cố định và kiểu dữ liệu cố định cho từng vị trí
let coordinate: [number, number] = [10.5, 20.8]; // Ví dụ: Kinh độ, Vĩ độ
```

---

## 3. Kiểu Đối tượng (Object) và Interface

Trong React, chúng ta thường dùng `interface` để định nghĩa cấu trúc của một đối tượng phức tạp như thông tin người dùng hoặc thuộc tính (Props) của Component.

```typescript
// Định nghĩa cấu trúc đối tượng bằng Interface
interface Product {
  id: number;
  title: string;
  price: number;
  description?: string; // Dấu '?' nghĩa là thuộc tính này không bắt buộc
}

// Sử dụng Interface cho một biến
const myLaptop: Product = {
  id: 101,
  title: "MacBook Pro",
  price: 2500
};
```

---

## 4. Kiểu Hợp nhất (Union Types)

Cho phép một biến có thể nhận một trong nhiều kiểu dữ liệu khác nhau. Điều này cực kỳ hữu ích khi quản lý trạng thái API (lúc có dữ liệu, lúc báo lỗi).

```typescript
// Biến có thể là số HOẶC chuỗi
let identification: string | number;
identification = "ID123"; // Hợp lệ
identification = 123;     // Hợp lệ

// Union kết hợp với giá trị cụ thể (Literal Types)
let status: "loading" | "success" | "error";
status = "loading"; // Hợp lệ
// status = "pending"; // LỖI: Không nằm trong danh sách cho phép
```

---

## 5. Kiểu Hàm (Function Types)

TypeScript yêu cầu định nghĩa kiểu cho tham số đầu vào và kiểu dữ liệu trả về của hàm.

```typescript
// Định nghĩa kiểu cho tham số (a, b) và kiểu trả về (number)
const add = (a: number, b: number): number => {
  return a + b;
};

// Kiểu 'void': Dùng cho các hàm không trả về giá trị gì (thường dùng cho hàm xử lý sự kiện)
const logMessage = (message: string): void => {
  console.log(message);
};
```

---

## 6. Các kiểu đặc biệt khác

*   **`any`**: Cho phép biến nhận bất kỳ kiểu dữ liệu nào. **Lưu ý:** Nên hạn chế dùng `any` vì nó làm mất đi ý nghĩa bảo vệ của TypeScript.
*   **`unknown`**: Tương tự `any` nhưng an toàn hơn, bắt buộc bạn phải kiểm tra kiểu dữ liệu trước khi thực hiện các thao tác chuyên sâu.
*   **`enum`**: Dùng để định nghĩa một nhóm các hằng số có tên (ví dụ: các hướng Đông, Tây, Nam, Bắc).

---

## 7. Áp dụng thực tế trong React Component

Kết hợp các kiến thức trên để tạo một Component chuyên nghiệp:

```tsx
interface UserProfileProps {
  name: string;          // Primitive Type
  age: number;           // Primitive Type
  tags: string[];        // Array Type
  role: "Admin" | "User"; // Union Type
  onSave: () => void;    // Function Type (void)
}

const UserProfile = ({ name, age, tags, role, onSave }: UserProfileProps) => {
  return (
    <div>
      <h2>{name} ({age})</h2>
      <p>Quyền hạn: {role}</p>
      <ul>
        {tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      <button onClick={onSave}>Lưu thông tin</button>
    </div>
  );
};
```

**Lợi ích khi dùng các kiểu này:** Khi bạn gọi `<UserProfile />` ở một nơi khác, nếu bạn quên truyền `onSave` hoặc truyền `age` dưới dạng một chuỗi `"25"`, trình soạn thảo (VS Code) sẽ báo lỗi đỏ ngay lập tức, giúp bạn sửa lỗi trước khi chạy ứng dụng.