### Modal / Dialog Component in React with Tailwind CSS

**Mục đích**  
Modal (hay Dialog) là một overlay popup hiển thị nội dung quan trọng, yêu cầu tương tác từ người dùng (xác nhận hành động, hiển thị form, chi tiết chi tiết, cảnh báo, v.v.).  
Modal tốt cần:
- Che phủ toàn màn hình với backdrop mờ
- Có thể đóng bằng nút X, nhấn ESC, hoặc click ngoài modal
- Tập trung focus vào modal (trapping focus)
- Hỗ trợ animation mượt mà
- Accessible (ARIA attributes)

Ví dụ dưới đây xây dựng một **Modal component tái sử dụng**, sử dụng Tailwind CSS và React thuần (không phụ thuộc thư viện bên thứ ba như Headless UI hay Radix UI).

#### 1. Modal Component cơ bản (có backdrop, close button, trap focus đơn giản)

**src/components/Modal.jsx**

```jsx
import { useEffect, useRef } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title = 'Thông báo',
  children,
  size = 'md', // sm | md | lg | xl
  showCloseButton = true,
}) {
  const modalRef = useRef(null);

  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // Trap focus: focus vào modal ngay khi mở
      modalRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative bg-white rounded-2xl shadow-2xl 
          w-full ${sizeClasses[size] || 'max-w-md'} 
          mx-4 max-h-[90vh] overflow-y-auto
          transform transition-all duration-300
          scale-100 opacity-100
          animate-in fade-in zoom-in-95
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              aria-label="Đóng"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer (tùy chọn – có thể truyền từ props nếu cần) */}
        {/* Nếu muốn thêm nút Confirm/Cancel, truyền thêm prop footer */}
      </div>
    </div>
  );
}
```

#### 2. Ví dụ sử dụng Modal

**src/App.jsx** (hoặc bất kỳ component nào)

```jsx
import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Mở Modal Xác nhận
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Xác nhận xóa"
        size="md"
      >
        <div className="space-y-6">
          <p className="text-gray-700">
            Bạn có chắc chắn muốn xóa sản phẩm <strong>"Tai nghe Sony WH-1000XM5"</strong> không? 
            Hành động này không thể hoàn tác.
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                alert('Đã xóa sản phẩm!');
                setIsModalOpen(false);
              }}
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Xóa
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
```

#### 3. Best Practices khi sử dụng Modal

- **Trạng thái mở/đóng**: Luôn điều khiển bằng state (`isOpen`, `onClose`) từ component cha.
- **Accessibility**:
    - Sử dụng `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
    - Trap focus (có thể nâng cao bằng thư viện như `focus-trap-react` nếu cần)
    - Đóng bằng ESC và click backdrop là chuẩn UX
- **Animation**: Sử dụng `animate-in` / `animate-out` của Tailwind (cần Tailwind ≥ 3.2) hoặc Framer Motion cho mượt hơn.
- **Kích thước linh hoạt**: Props `size` giúp dễ dàng thay đổi theo nội dung.
- **Biến thể phổ biến**:
    - Confirmation modal (như ví dụ trên)
    - Form modal (đăng nhập, chỉnh sửa profile)
    - Alert modal (thông báo thành công/lỗi)
    - Full-screen modal trên mobile (`max-w-full h-full`)

#### 4. Mở rộng (nếu cần nâng cao)

- Thêm prop `footer` để tùy chỉnh nút hành động
- Thêm prop `preventCloseOnBackdrop` cho modal không đóng khi click ngoài
- Sử dụng `Portal` (từ `react-dom`) để render modal ở cấp root (tránh z-index conflict)