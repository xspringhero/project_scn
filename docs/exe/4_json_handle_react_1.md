Tạo một React Component (Sử dụng TypeScript và Arrow Function) để hiển thị danh mục từ file `categories.json`.

### Bước 1: Chuẩn bị file
Đảm bảo bạn đã để file `categories.json` vào thư mục dự án (ví dụ: `src/data/categories.json`).

### Bước 2: Tạo Component hiển thị danh mục
Chúng ta sẽ tạo file `src/components/CategoryList.tsx`.

```tsx
import React from 'react';
// 1. Import dữ liệu trực tiếp từ file JSON
import categoriesData from '../data/categories.json';

// 2. Định nghĩa Interface để quy định cấu trúc của một Danh mục
// Việc này giúp gợi ý code và tránh lỗi khi truy cập các thuộc tính
interface Category {
  id: number;
  name: string;
  description: string;
  totalGames: number;
}

// 3. Khai báo Component bằng Arrow Function (Lambda)
const CategoryList = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2c3e50' }}>Danh Mục Trò Chơi</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {/* 
          4. Sử dụng hàm .map() kết hợp với Arrow Function 
          để duyệt qua mảng categoriesData và hiển thị từng danh mục.
        */}
        {categoriesData.map((category: Category) => (
          <div 
            key={category.id} // Bắt buộc phải có key (dùng id) để React quản lý danh sách
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#e67e22' }}>
              {category.name}
            </h3>
            <p style={{ fontSize: '14px', color: '#7f8c8d', height: '40px' }}>
              {category.description}
            </p>
            <hr />
            <p style={{ fontWeight: 'bold', margin: '10px 0 0 0' }}>
              Số lượng game: {category.totalGames}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
```

---

### Giải thích:

1.  **Tính tiện lợi của Import JSON:** Trong React, khi bạn `import` một file `.json`, nó sẽ tự động biến thành một mảng hoặc đối tượng JavaScript mà không cần dùng `fetch` hay `JSON.parse`.
2.  **Sử dụng Interface:** Việc ghi `(category: Category)` bên trong hàm map giúp máy tính biết chắc chắn `category` có các trường `name`, `description`,... Nếu bạn gõ sai `discription` (sai chính tả), nó sẽ báo lỗi đỏ ngay lập tức.
3.  **Arrow Function lồng nhau:**
    *   `const CategoryList = () => { ... }` là Arrow Function để định nghĩa Component.
    *   `categoriesData.map(category => ( ... ))` là Arrow Function (Lambda) dùng để xử lý dữ liệu. Đây là cách viết cực kỳ phổ biến và sạch sẽ trong React.
4.  **Dấu ngoặc tròn `( )` sau mũi tên `=>`:**
    *   Lưu ý chúng ta dùng `map(item => ( JSX ))` thay vì `map(item => { return JSX })`. Dấu ngoặc tròn cho phép bạn trả về khối mã JSX ngay lập tức mà không cần từ khóa `return`.
5.  **Prop `key`:** Luôn nhắc học sinh dùng `category.id` làm key. Đây là "chứng minh thư" của phần tử giúp React biết cái nào cần cập nhật khi dữ liệu thay đổi.