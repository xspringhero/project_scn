## Hướng dẫn triển khai react project lên github.

---

### Bước 1: Chuẩn bị Repository trên GitHub
1. Truy cập GitHub và tạo một **New Repository**.
2. Đặt tên (ví dụ: `my-react-app`).
3. Đẩy code từ máy tính lên GitHub (nếu bạn chưa làm):
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git remote add origin https://github.com/ten-user-cua-ban/ten-repo-cua-ban.git
   git push -u origin main
   ```

---

### Bước 2: Cài đặt gói `gh-pages`
Mở terminal tại thư mục dự án và chạy lệnh:
```bash
npm install gh-pages --save-dev
```

---

### Bước 3: Cấu hình dự án

#### Trường hợp A: Nếu bạn dùng Vite (Phổ biến hiện nay)
1. Mở file `vite.config.js`.
2. Thêm dòng `base: "/ten-repo-cua-ban/"`.
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: "/my-react-app/", // Tên repository của bạn
   })
   ```
3. Mở file `package.json`, thêm 2 dòng này vào phần `"scripts"`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ...
   }
   ```

#### Trường hợp B: Nếu bạn dùng Create React App (CRA)
1. Mở file `package.json`.
2. Thêm thuộc tính `homepage` ở cấp ngoài cùng:
   ```json
   "homepage": "https://ten-user-cua-ban.github.io/ten-repo-cua-ban",
   ```
3. Thêm 2 dòng này vào phần `"scripts"`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     ...
   }
   ```

---

### Bước 4: Tiến hành Deploy
Trong terminal, hãy chạy lệnh sau:
```bash
npm run deploy
```
Lệnh này sẽ tự động:
- Chạy `npm run build` để tạo bản đóng gói.
- Tạo một nhánh mới tên là `gh-pages` trên GitHub và đẩy code bản build lên đó.

---

### Bước 5: Cấu hình trên GitHub Settings
1. Truy cập vào Repository của bạn trên trình duyệt GitHub.
2. Chọn tab **Settings**.
3. Ở menu bên trái, chọn **Pages**.
4. Tại mục **Build and deployment** > **Branch**:
    - Đảm bảo nó đang chọn nhánh `gh-pages`.
    - Thư mục là `/(root)`.
5. Nhấn **Save**.

Đợi khoảng 1-2 phút, GitHub sẽ cung cấp một đường link (ví dụ: `https://ten-user.github.io/my-react-app/`). Bạn có thể truy cập để xem kết quả.

---

### ⚠️ Lưu ý cực kỳ quan trọng (Lỗi thường gặp)

**1. Lỗi trắng trang khi dùng React Router:**
GitHub Pages không hỗ trợ tốt cho `BrowserRouter` (khi bạn load lại trang hoặc truy cập trực tiếp link con sẽ bị lỗi 404).
*   **Cách khắc phục:** Hãy chuyển sang dùng **`HashRouter`** thay cho `BrowserRouter` trong code của bạn.
    ```javascript
    import { HashRouter } from 'react-router-dom';
    // ...
    <HashRouter>
       <App />
    </HashRouter>
    ```

**2. Cập nhật code:**
Sau này mỗi khi bạn sửa code và muốn cập nhật lên web, bạn chỉ cần chạy lại lệnh:
```bash
npm run deploy
```

**3. Tên Repository đặc biệt:**
Nếu bạn đặt tên Repository là `ten-user.github.io` (Project đặc biệt), thì phần `base` trong Vite hoặc `homepage` trong CRA chỉ cần để là `"/"`.