**Card component**

### Bước 1: Cài Tailwind vào dự án

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Mở file `tailwind.config.js`, thay nội dung:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Mở `src/index.css` (hoặc tạo mới nếu chưa có) và thay bằng:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Bước 2: Card component với Tailwind

Tạo file `src/components/Card.jsx`:

```jsx
// src/components/Card.jsx
function Card({ image, title, description, price, onClick }) {
  return (
    <div 
      className="
        w-full max-w-[300px] 
        bg-white rounded-xl shadow-lg overflow-hidden 
        transition-all duration-300 
        hover:shadow-xl hover:scale-[1.03] 
        border border-gray-200
      "
    >
      {/* Hình ảnh */}
      <img 
        src={image} 
        alt={title}
        className="w-full h-52 object-cover"
      />

      {/* Nội dung */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            {price.toLocaleString('vi-VN')}đ
          </span>

          <button
            onClick={onClick}
            className="
              px-4 py-2 
              bg-blue-600 text-white 
              text-sm font-medium 
              rounded-lg 
              hover:bg-blue-700 
              transition-colors 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
```

### Bước 3: Sử dụng trong App.jsx

```jsx
// src/App.jsx
import Card from './components/Card';

function App() {
  const handleAddToCart = (title) => {
    alert(`Đã thêm "${title}" vào giỏ hàng!`);
  };

  const products = [
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      title: "Đồng hồ thông minh",
      description: "Thiết kế hiện đại, pin siêu lâu, theo dõi sức khỏe 24/7.",
      price: 2490000
    },
    {
      image: "https://images.unsplash.com/photo-1572569511254-d89a9c0b4e0a?w=500",
      title: "Giày thể thao Nike",
      description: "Êm ái, nhẹ, phù hợp chạy bộ và tập gym.",
      price: 1800000
    },
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      title: "Tai nghe không dây",
      description: "Âm thanh chất lượng cao, chống ồn chủ động.",
      price: 3200000
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Sản phẩm nổi bật
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            onClick={() => handleAddToCart(product.title)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

### Kết quả

- Card responsive (1 cột trên mobile, 2–3 cột trên màn lớn).
- Hover: phóng to nhẹ + shadow đậm hơn.
- Button có hiệu ứng hover, focus đẹp.
- Typography rõ ràng, màu sắc hài hòa.
- Dễ tùy chỉnh (chỉ cần thay class Tailwind).