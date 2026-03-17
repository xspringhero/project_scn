# QUẢN LÝ TRẠNG THÁI VÀ TRUYỀN DỮ LIỆU
---

## 1. Định nghĩa kiểu dữ liệu (Interface)

Trước hết, cần xác định cấu trúc của một sản phẩm để TypeScript có thể kiểm soát chặt chẽ.

```tsx
// Định nghĩa cấu trúc của một đối tượng Sản phẩm
interface Product {
  id: number;
  name: string;
  price: number;
  isLiked: boolean;
}
```

---

## 2. Component Con: `ProductCard.tsx`

Component này đóng vai trò hiển thị thông tin của từng sản phẩm đơn lẻ. Nó không tự quản lý dữ liệu mà nhận mọi thứ từ Cha.

```tsx
// Định nghĩa các Props mà Component Con mong đợi nhận được từ Cha
interface ProductCardProps {
  product: Product;           // Dữ liệu của một sản phẩm
  onToggleLike: (id: number) => void; // Một hàm xử lý sự kiện truyền từ Cha xuống
}

const ProductCard = ({ product, onToggleLike }: ProductCardProps) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      margin: '10px',
      borderRadius: '8px',
      backgroundColor: product.isLiked ? '#fff0f0' : '#fff'
    }}>
      <h3>{product.name}</h3>
      <p>Giá: {product.price.toLocaleString()} VNĐ</p>
      
      {/* Khi click nút, gọi hàm onToggleLike được Cha truyền xuống */}
      <button onClick={() => onToggleLike(product.id)}>
        {product.isLiked ? '❤️ Đã thích' : '🤍 Yêu thích'}
      </button>
    </div>
  );
};

export default ProductCard;
```

---

## 3. Component Cha: `ProductList.tsx`

Component này giữ vai trò "đầu não". Nó quản lý danh sách sản phẩm trong **State** và điều phối việc hiển thị các **Component Con**.

```tsx
import { useState } from 'react';
import ProductCard from './ProductCard'; // Import Component Con

const ProductList = () => {
  // KHỞI TẠO STATE: Danh sách sản phẩm ban đầu
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "iPhone 15 Pro", price: 28000000, isLiked: false },
    { id: 2, name: "MacBook Air M2", price: 24000000, isLiked: false },
    { id: 3, name: "AirPods Pro 2", price: 5000000, isLiked: true },
  ]);

  // HÀM CẬP NHẬT STATE: Xử lý khi người dùng nhấn nút "Yêu thích"
  const handleToggleLike = (productId: number) => {
    // Tạo một mảng mới dựa trên mảng cũ để React nhận biết sự thay đổi
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, isLiked: !p.isLiked }; // Đảo ngược trạng thái isLiked
      }
      return p;
    });

    // Cập nhật State -> React sẽ tự động render lại toàn bộ danh sách
    setProducts(updatedProducts);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cửa hàng Công nghệ</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Duyệt qua mảng sản phẩm trong State để tạo ra các Component Con */}
        {products.map((item) => (
          <ProductCard 
            key={item.id}         // 'key' giúp Virtual DOM nhận diện phần tử thay đổi
            product={item}        // Truyền dữ liệu qua Prop 'product'
            onToggleLike={handleToggleLike} // Truyền hàm xử lý qua Prop 'onToggleLike'
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
```

---

## 4. Phân tích luồng dữ liệu trong ví dụ

### A. Từ Cha xuống Con (Dữ liệu - Props)
*   Component `ProductList` (Cha) giữ danh sách sản phẩm trong `useState`.
*   Nó sử dụng hàm `.map()` để lặp qua danh sách và gọi nhiều Component `ProductCard` (Con).
*   Mỗi Component Con nhận được một đối tượng `product` riêng biệt thông qua **Props**. Đây là cách truyền dữ liệu theo một chiều từ trên xuống.

### B. Từ Con lên Cha (Sự kiện - Callbacks)
*   Khi người dùng nhấn nút "Yêu thích" ở Component Con, bản thân nó không có quyền tự đổi giá trị `isLiked` (vì Props là chỉ đọc).
*   Thay vào đó, nó gọi hàm `onToggleLike` mà Cha đã đưa cho nó.
*   Hàm này chạy tại Component Cha, thực hiện cập nhật **State** của Cha bằng hàm `setProducts`.

### C. Cơ chế Virtual DOM cập nhật giao diện
1.  **Hành động:** Người dùng click nút "Yêu thích" ở sản phẩm số 1.
2.  **Xử lý:** Hàm `handleToggleLike` chạy -> `setProducts` được gọi với dữ liệu mới.
3.  **Virtual DOM:** React tạo ra một cây Virtual DOM mới. Nó so sánh và thấy rằng chỉ có `isLiked` của sản phẩm số 1 thay đổi từ `false` sang `true`.
4.  **Cập nhật:** React chỉ yêu cầu trình duyệt vẽ lại (re-render) đúng phần giao diện của sản phẩm số 1 (đổi màu nền và đổi icon nút), các phần khác như sản phẩm số 2 và 3 được giữ nguyên để tối ưu hiệu suất.

---

## 5. Các điểm cần ghi nhớ chuyên nghiệp
*   **Key Prop:** Luôn sử dụng thuộc tính `key` (thường là ID duy nhất từ dữ liệu) khi render danh sách để Virtual DOM hoạt động hiệu quả.
*   **Immutability (Tính bất biến):** Khi cập nhật State là mảng hoặc đối tượng, luôn tạo ra một bản sao mới (ví dụ dùng `map` hoặc `spread operator ...`) thay vì thay đổi trực tiếp biến cũ. Điều này giúp React nhận diện được sự thay đổi để kích hoạt render.
*   **Single Source of Truth:** Dữ liệu nên được quản lý tại một nơi duy nhất (Component Cha chung gần nhất) để đảm bảo tính đồng bộ của ứng dụng.

## Hàm `map()`

**map()** là một trong những phương thức mạnh mẽ và được dùng nhiều nhất trong JavaScript/React.

**Cú pháp cơ bản:**
```js
mảngMới = mảngCũ.map( (phần_tử, index, mảng_gốc) => {
  // trả về giá trị mới cho phần tử này
});
```

**Một số ví dụ minh họa:**

1. Nhân đôi mỗi số
```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// → [2, 4, 6, 8]
```

2. Lấy ra chỉ tên từ mảng object
```js
const users = [
  { id: 1, name: "An" },
  { id: 2, name: "Bình" },
  { id: 3, name: "Cường" }
];

const names = users.map(user => user.name);
// → ["An", "Bình", "Cường"]
```

3. Thêm thuộc tính mới cho từng object (giống cách toggle like)
```js
const students = [
  { name: "Lan", score: 8 },
  { name: "Hùng", score: 6 }
];

const withStatus = students.map(s => ({
  ...s,
  isPassed: s.score >= 5
}));
// → [{name:"Lan", score:8, isPassed:true}, {name:"Hùng", score:6, isPassed:true}]
```

4. Render danh sách trong JSX (như đoạn code của bạn)
```jsx
const colors = ["red", "blue", "green"];

return (
  <ul>
    {colors.map(color => (
      <li key={color} style={{ color }}>{color}</li>
    ))}
  </ul>
);
```

## Cập nhật trạng thái like của sản phẩm

```tsx
const updatedProducts = products.map(p => {
  if (p.id === productId) {
    return { ...p, isLiked: !p.isLiked }; // Đảo ngược trạng thái isLiked
  }
  return p;
});
```
- `products` là một **mảng** chứa các object sản phẩm (ví dụ: danh sách sản phẩm trong state).
  Mỗi phần tử trong mảng có dạng: `{ id: 1, name: "Áo thun", price: 250000, isLiked: false, ... }`

- `.map()` là phương thức **tạo ra một mảng mới** bằng cách duyệt qua từng phần tử của mảng cũ và **trả về giá trị mới** cho phần tử đó.

- Trong callback của map:
    - `p` là **phần tử hiện tại** đang được duyệt (mỗi lần là một object sản phẩm)
    - Nếu `p.id === productId` → đây là sản phẩm mà người dùng vừa bấm like/unlike
      → Ta **tạo một object mới** để thay thế object cũ:
        ```ts
        { ...p, isLiked: !p.isLiked }
        ```
      → `{ ...p }` nghĩa là **copy toàn bộ thuộc tính** của object `p` sang object mới
      → Sau đó ghi đè thuộc tính `isLiked` bằng giá trị **ngược lại** (`!p.isLiked` = true nếu trước là false và ngược lại)

- Nếu **không phải** sản phẩm được chọn → chỉ **trả về nguyên object cũ** (`return p`)

**Kết quả:**
- `updatedProducts` là **mảng mới**, giống hệt `products` **trừ** sản phẩm có `id === productId` sẽ có `isLiked` bị đảo ngược.
- **Không làm thay đổi trực tiếp mảng products cũ** → Đây là cách làm **immutable** (không đột biến) → rất quan trọng trong React.

**Cách viết ngắn gọn hơn (rất phổ biến):**

```tsx
const updatedProducts = products.map(p =>
  p.id === productId
    ? { ...p, isLiked: !p.isLiked }
    : p
);
```

## Giải thích Render danh sách sản phẩm

```tsx
<div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {products.map((item) => (
    <ProductCard 
      key={item.id}
      product={item}
      onToggleLike={handleToggleLike}
    />
  ))}
</div>
```
- `products.map(...)` → duyệt qua từng sản phẩm trong mảng `products`
- Với mỗi sản phẩm (`item`), trả về một **component `<ProductCard />`**
- Các props được truyền vào:
    - `key={item.id}`  
      → **Bắt buộc** khi render danh sách trong React  
      → Giúp React nhận diện phần tử nào thay đổi, thêm, xóa → tối ưu render, tránh bug khi danh sách thay đổi

    - `product={item}`  
      → Truyền **toàn bộ object sản phẩm** vào component con để component con sử dụng (hiển thị tên, giá, ảnh, trạng thái like…)

    - `onToggleLike={handleToggleLike}`  
      → Truyền **hàm xử lý** từ component cha xuống  
      → Khi người dùng bấm like trong `<ProductCard>`, component con sẽ gọi hàm này và truyền `productId` lên để cha cập nhật state

**luồng dữ liệu:**
1. Người dùng bấm nút like trong `<ProductCard>`
2. `<ProductCard>` gọi `onToggleLike(product.id)`
3. Component cha nhận `productId` → chạy đoạn code đầu tiên → tạo mảng `updatedProducts` mới
4. Cập nhật state: `setProducts(updatedProducts)`
5. React re-render → danh sách hiển thị trạng thái like mới

