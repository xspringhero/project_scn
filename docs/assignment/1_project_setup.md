### 1.1. Khởi tạo dự án React với Vite
Mở terminal và chạy các lệnh sau:

```bash
# Tạo dự án mới với tên 'youtube-search-app'
npm create vite@latest youtube-search-app -- --template react

# Di chuyển vào thư mục dự án
cd youtube-search-app

# Cài đặt các thư viện cơ bản
npm install
```

### 1.2. Cài đặt Tailwind CSS
Cài đặt Tailwind và các thư viện hỗ trợ qua npm:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Lệnh trên sẽ tạo ra hai file: `tailwind.config.js` và `postcss.config.js`.

### 1.3. Cấu hình Tailwind CSS
Mở file `tailwind.config.js` và thay thế nội dung bằng đoạn mã sau để Tailwind có thể quét các file React:

```javascript
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

Tiếp theo, mở file `./src/index.css` và xóa hết nội dung cũ, thay bằng 3 dòng directive của Tailwind:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100; /* Thêm màu nền nhẹ cho toàn trang */
}
```

### 1.4. Cài đặt các thư viện bổ sung cần thiết
Để phục vụ cho các bước sau (gọi API và dùng icon), bạn nên cài đặt luôn:

```bash
# axios để gọi API, lucide-react để lấy icon đẹp
npm install axios lucide-react
```

### 1.5. Xây dựng cấu trúc thư mục (Folder Structure)
Để dự án chuyên nghiệp và dễ quản lý, bạn hãy tạo các thư mục trong `src` theo cấu trúc sau:

```text
src/
├── api/             # Nơi chứa cấu hình gọi axios tới YouTube
├── components/      # Các component tái sử dụng (SearchBar, VideoItem, Modal...)
├── hooks/           # Các custom hooks (ví dụ: dùng để gọi API)
├── App.jsx          # Component chính điều khiển logic
├── main.jsx         # Điểm bắt đầu của ứng dụng
└── index.css        # CSS global
```

**Cách tạo nhanh bằng lệnh (Linux/macOS hoặc Git Bash):**
```bash
mkdir src/api src/components src/hooks
```

### 1.6. Kiểm tra xem dự án đã chạy chưa
Chạy lệnh:
```bash
npm run dev
```