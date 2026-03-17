### Loading / Spinner / Skeleton Components trong React với Tailwind CSS

**Mục đích**  
Các component loading được sử dụng để cung cấp phản hồi trực quan trong thời gian chờ dữ liệu từ API, xử lý tác vụ dài, hoặc khi nội dung đang được tải. Chúng cải thiện trải nghiệm người dùng bằng cách giảm cảm giác chờ đợi và tránh giao diện trống rỗng.

Ba loại phổ biến nhất:

- **Spinner** (Loading indicator quay vòng): Dùng cho toàn trang hoặc hành động ngắn.
- **Full-page Loader**: Che toàn màn hình khi ứng dụng khởi tạo.
- **Skeleton** (Loading placeholder): Dùng cho danh sách, card, form – hiển thị cấu trúc giao diện với hiệu ứng mờ dần (shimmer).

Tất cả ví dụ dưới đây sử dụng **Tailwind CSS** thuần (không phụ thuộc thư viện bên thứ ba như react-spinners hay react-loading-skeleton), đảm bảo nhẹ và dễ tùy chỉnh.

#### 1. Spinner Component (Loading Indicator)

**src/components/Spinner.jsx**

```jsx
export default function Spinner({ size = "md", color = "blue", message = "Đang tải..." }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-500",
    gray: "border-gray-500",
    green: "border-green-500",
    red: "border-red-500",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          animate-spin rounded-full 
          border-4 border-t-transparent 
          ${sizeClasses[size] || "w-10 h-10"} 
          ${colorClasses[color] || "border-blue-500"}
        `}
        role="status"
        aria-label="loading"
      />
      {message && (
        <p className="text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );
}
```

**Cách sử dụng**

```jsx
import Spinner from '@/components/Spinner';

// Trong component
{isLoading && <Spinner size="lg" color="blue" message="Đang tải sản phẩm..." />}
```












#### 2. Full-Page Loader

**src/components/FullPageLoader.jsx**

```jsx
export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Spinner size="lg" color="blue" message="Đang khởi tạo ứng dụng..." />
    </div>
  );
}
```

**Cách sử dụng** (thường đặt ở cấp cao nhất hoặc trong layout)

```jsx
{appIsInitializing && <FullPageLoader />}
```

#### 3. Skeleton Loading (cho Card / List)

**src/components/SkeletonCard.jsx**  
(Phù hợp với Card component đã tạo trước đó)

```jsx
export default function SkeletonCard() {
  return (
    <div className="w-full max-w-[300px] bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      {/* Hình ảnh giả */}
      <div className="w-full h-52 bg-gray-200 animate-pulse" />

      <div className="p-5 space-y-4">
        {/* Tiêu đề */}
        <div className="h-7 bg-gray-200 rounded w-4/5 animate-pulse" />

        {/* Mô tả */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>

        {/* Giá + nút */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
```

**Cách sử dụng trong danh sách**

```jsx
<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {isLoading
    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
    : products.map(product => <Card key={product.id} {...product} />)}
</div>
```












#### Best Practices

- Sử dụng `animate-pulse` của Tailwind cho hiệu ứng shimmer tự nhiên.
- Thêm `aria-busy="true"` hoặc `role="status"` để hỗ trợ screen reader.
- Kết hợp với React Query / SWR: hiển thị skeleton trong `isLoading`, spinner trong `isFetching`.
- Tạo biến thể (props) để tái sử dụng: size, color, variant (dots, bars, pulse...).
- Tránh lạm dụng full-page loader cho mọi request – ưu tiên skeleton cho nội dung cụ thể.
- Đảm bảo skeleton có kích thước gần giống nội dung thật để tránh layout shift (Cumulative Layout Shift – CLS).
