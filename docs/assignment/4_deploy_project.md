### Bước 4: Deploy sản phẩm lên GitHub Pages

#### 4.1. Đẩy code lên GitHub (Nếu bạn chưa làm)
1. Tạo một repository mới trên GitHub (ví dụ tên là: `youtube-search-app`).
2. Mở terminal tại thư mục dự án và chạy các lệnh:
   ```bash
   git init
   git add .
   git commit -m "Hoàn thành dự án YouTube Search"
   git remote add origin https://github.com/ten-user-cua-ban/youtube-search-app.git
   git push -u origin main
   ```

---

#### 4.2. Cấu hình Vite (Cực kỳ quan trọng)
Vite mặc định hiểu là bạn deploy lên tên miền gốc (ví dụ `mysite.com`). Nhưng GitHub Pages thường có dạng `ten-user.github.io/ten-repo/`. Do đó bạn cần cấu hình lại đường dẫn gốc.

Mở file `vite.config.js` và thêm thuộc tính `base`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/youtube-search-app/', // Tên repository chính xác của bạn trên GitHub
})
```

---

#### 4.3. Cài đặt thư viện `gh-pages`
Chạy lệnh sau trong terminal:
```bash
npm install gh-pages --save-dev
```

---

#### 4.4. Thêm Script Deploy vào `package.json`
Mở file `package.json`, tìm đến phần `"scripts"` và thêm 2 dòng này:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
*Lưu ý: Với Vite, thư mục đóng gói là `dist`. Nếu bạn dùng Create React App thì mới là `build`.*

---

#### 4.5. Thực hiện Deploy
Bây giờ, bạn chỉ cần chạy lệnh duy nhất:
```bash
npm run deploy
```
**Quá trình diễn ra như sau:**
- Lệnh `predeploy` sẽ chạy để build dự án vào thư mục `dist`.
- Thư viện `gh-pages` sẽ tự động tạo một nhánh mới trên GitHub tên là `gh-pages` và đẩy nội dung thư mục `dist` lên đó.

---

#### 4.6. Kích hoạt trên GitHub Settings
1. Truy cập vào Repository của bạn trên trình duyệt GitHub.
2. Vào tab **Settings** -> **Pages** (cột bên trái).
3. Tại mục **Build and deployment** > **Branch**:
    - Chọn nhánh là `gh-pages`.
    - Thư mục là `/(root)`.
4. Nhấn **Save**.
5. Đợi khoảng 1-2 phút, bạn sẽ thấy link trang web hiện ra ở trên cùng (ví dụ: `https://ten-user.github.io/youtube-search-app/`).

---

### ⚠️ Một lưu ý quan trọng về Bảo mật (Security)
Vì đây là ứng dụng chạy ở phía Client (Frontend), **API Key của bạn sẽ bị lộ** nếu ai đó xem Source Code (F12). Để bảo vệ API Key của bạn trên Google Cloud Console:
1. Vào trang quản lý API Key trên [Google Cloud Console](https://console.cloud.google.com/).
2. Chọn API Key bạn đang dùng.
3. Tìm mục **API restrictions** -> Chọn "Restrict key".
4. Tìm và chọn **"YouTube Data API v3"** trong danh sách.
5. Ở mục **Website restrictions**, bạn thêm domain của GitHub Pages vào (ví dụ: `https://ten-user.github.io/*`).
   *Điều này giúp ngăn chặn người khác lấy Key của bạn để dùng cho trang web khác của họ.*
