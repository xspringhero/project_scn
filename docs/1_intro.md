### 1. React là gì? Tại sao đi kèm với TypeScript?

*   **React:** Là thư viện JavaScript để xây dựng giao diện (UI) dựa trên các **Component**.
*   **TypeScript:** Là một "lớp áo" bao ngoài JavaScript, bổ sung thêm hệ thống **Kiểu dữ liệu (Type)**.
*   **React + TS:** Giúp bạn biết rõ một Component nhận vào dữ liệu gì (chuỗi, số, hay mảng), giúp giảm thiểu 80% lỗi ngớ ngẩn (như gọi nhầm tên biến hoặc truyền sai kiểu dữ liệu) ngay khi đang viết code.

* Về mặt kỹ thuật, **React là một Thư viện (Library)**, không phải là một Framework (như Angular).
Sự khác biệt nằm ở khái niệm **"Inversion of Control" (Đảo ngược quyền điều khiển)**. Hãy tưởng tượng như sau:

#### Thư viện (Library) - Ví dụ: React
*   **Bạn là người điều khiển:** Bạn là người quyết định khi nào thì dùng React, dùng nó ở chỗ nào trong trang web.
*   **Tập trung hẹp:** React chỉ lo đúng một việc duy nhất: **Hiển thị giao diện (View)**.
*   **Tự do lựa chọn:** React không có sẵn hệ thống chuyển trang (Routing), không có sẵn cách gọi API (Http Client). Bạn muốn dùng cái nào thì tự cài thêm cái đó (ví dụ: dùng `React Router` để chuyển trang, dùng `Axios` để gọi API).
*   **Ví dụ:** Bạn mua những viên gạch (React), tự chọn xi măng, tự chọn màu sơn để xây nhà theo ý mình.

#### Framework - Ví dụ: Angular
*   **Framework điều khiển bạn:** Nó cung cấp một cái "khung" hoàn chỉnh. Bạn phải viết code tuân theo đúng quy tắc, đặt file đúng chỗ mà nó quy định.
*   **Đầy đủ mọi thứ (All-in-one):** Khi cài Angular, nó có sẵn mọi thứ: chuyển trang, xử lý form, gọi API, bảo mật... Bạn không cần (và thường là không nên) chọn thư viện bên ngoài.
*   **Ít tự do hơn:** Bạn phải làm theo "cách của Angular".
*   **Ví dụ:** Bạn mua một căn nhà xây sẵn (Framework), bạn chỉ được phép vào trang trí nội thất và sơn lại tường theo quy định của chủ thầu.

---

#### Tại sao gọi là "React Framework"?

Dù React là một thư viện, nhưng trong thực tế hiện nay, ít ai dùng React "đơn độc". Người ta thường dùng React kết hợp với các công cụ khác để tạo thành một bộ khung hoàn chỉnh.

Đặc biệt là sự xuất hiện của **Next.js**.
*   React là **Thư viện**.
*   Next.js là một **Framework** xây dựng dựa trên React.

*   Nếu bạn nói **"React là một thư viện"**: Bạn đúng về mặt kỹ thuật.
*   Nếu bạn nói **"Hệ sinh thái React"**: Bạn đang nói đến sức mạnh thực sự của nó (khi kết hợp với các thư viện khác).

**Lời khuyên:** "React là một thư viện JavaScript để xây dựng giao diện người dùng".

---

### 2. So sánh React với JavaScript thuần (Vanilla JS)

| Đặc điểm | Vanilla JS | React (với TypeScript) |
| :--- | :--- | :--- |
| **Cách viết** | Trộn lẫn logic xử lý và cập nhật DOM thủ công. | Chia nhỏ thành các Component độc lập, tái sử dụng cao. |
| **Dữ liệu** | Không kiểm soát được kiểu dữ liệu (dễ lỗi runtime). | **Chặt chẽ:** Định nghĩa rõ ràng kiểu dữ liệu cho mọi biến/hàm. |
| **Bảo trì** | Khó khăn khi project lớn dần. | Cực kỳ dễ dàng nhờ sự hỗ trợ của bộ gõ (IntelliSense) trong VS Code. |

---

### 3. So sánh React với các Framework khác (Vue, Angular) và Xu hướng mới

| Framework | Đặc điểm chính | Khi nào nên chọn? |
| :--- | :--- | :--- |
| **React** | Thư viện, linh hoạt, cộng đồng lớn nhất thế giới. | Muốn hệ sinh thái rộng, nhiều việc làm, linh hoạt cao. |
| **Vue.js** | Dễ học hơn React, cú pháp gần với HTML/CSS truyền thống. | Muốn làm nhanh, tài liệu cực kỳ thân thiện. |
| **Angular** | Một Framework hoàn chỉnh (All-in-one), do Google phát triển. | Dự án cực lớn của doanh nghiệp, cần sự thống nhất tuyệt đối. |
| **Svelte** | **(Mới nổi)** Tốc độ cực nhanh, không dùng Virtual DOM. | Muốn hiệu năng tối đa và cú pháp ngắn gọn nhất. |
| **Next.js** | **(Đang dẫn đầu)** Là Framework xây dựng dựa trên React. | Khi bạn muốn làm ứng dụng React thực tế (hỗ trợ SEO, Server-side rendering). |

---

### 4. Cách tạo Project React + TypeScript (Dùng Vite)

**Bước 1:** Mở Terminal và chạy lệnh:
```bash
npm create vite@latest my-react-ts-app -- --template react-ts
```

**Bước 2:** Di chuyển vào thư mục và cài đặt:
```bash
cd my-react-ts-app
npm install
```

**Bước 3:** Khởi động:
```bash
npm run dev
```

---

### 5. Cấu trúc thư mục (TypeScript Version)

Cấu trúc file khi dùng TypeScript sẽ có chút thay đổi ở phần đuôi mở rộng:

```text
my-react-ts-app/
├── src/
│   ├── assets/         # Hình ảnh, icon
│   ├── App.css         
│   ├── App.tsx         # Component chính (đuôi .tsx thay vì .jsx)
│   ├── main.tsx        # Điểm bắt đầu (đuôi .tsx)
│   └── vite-env.d.ts   # File khai báo kiểu dữ liệu cho Vite (không cần chạm vào)
├── index.html          
├── tsconfig.json       # Cấu hình quan trọng của TypeScript
├── tsconfig.node.json  # Cấu hình TS cho môi trường Node
├── package.json        
└── vite.config.ts      # Cấu hình Vite (cũng dùng đuôi .ts)
```

**Sự khác biệt về đuôi file:**
*   **`.ts`**: Dùng cho các file chỉ chứa logic JavaScript thuần (hàm tính toán, gọi API...).
*   **`.tsx`**: Dùng cho các file có chứa mã **JSX** (giao diện HTML trong React).

---

### 6. Code mẫu: Component đầu tiên với TypeScript

Hãy mở file `App.tsx` và thử viết một Component đơn giản để thấy sức mạnh của TS:

```tsx
import { useState } from 'react'

// 1. Định nghĩa kiểu dữ liệu cho Props (nếu có)
interface GreetingProps {
  name: string;
  age?: number; // Dấu ? nghĩa là không bắt buộc
}

// 2. Component sử dụng TypeScript
function Greeting({ name, age }: GreetingProps) {
  return (
    <h1>Chào {name}, {age ? `bạn ${age} tuổi` : "không rõ tuổi"}!</h1>
  );
}

function App() {
  // 3. State cũng có thể định nghĩa kiểu dữ liệu
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <Greeting name="Lập trình viên" age={25} />
      <button onClick={() => setCount(count + 1)}>
        Số lần bấm: {count}
      </button>
    </div>
  )
}

export default App
```