Trong bài này, chúng ta sẽ áp dụng thêm các kỹ thuật:
1.  **Xử lý mảng trong mảng:** Hiển thị danh sách `platforms`.
2.  **Hiển thị có điều kiện:** Gắn nhãn "Nổi bật" nếu `isFeatured` là `true`.
3.  **Định dạng dữ liệu:** Hiển thị giá tiền và điểm đánh giá.

---

### Bài giải: Component `GameList.tsx`

```tsx
import React from 'react';
// 1. Import dữ liệu từ file games.json
import gamesData from '../data/games.json';

// 2. Định nghĩa Interface cho Game dựa trên cấu trúc JSON đã tạo
interface Game {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  isFeatured: boolean;
  platforms: string[];
  rating: number;
  releaseDate: string;
}

const GameList = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
        DANH SÁCH TRÒ CHƠI (20)
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px' 
      }}>
        {/* 3. Dùng .map() với Arrow Function để duyệt qua 20 game */}
        {gamesData.map((game: Game) => (
          <div 
            key={game.id} 
            style={{
              backgroundColor: '#2d2d2d',
              color: '#fff',
              padding: '20px',
              borderRadius: '12px',
              position: 'relative',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* 4. Hiển thị nhãn "HOT" nếu game là Featured (Điều kiện) */}
            {game.isFeatured && (
              <span style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#ff4757',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                HOT
              </span>
            )}

            <div>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e90ff' }}>{game.title}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#ccc' }}>
                Ngày phát hành: {game.releaseDate}
              </p>
              
              {/* 5. Xử lý hiển thị mảng platforms bằng hàm .join() */}
              <p style={{ fontSize: '14px' }}>
                💻 Nền tảng: <span style={{ color: '#ffa502' }}>{game.platforms.join(', ')}</span>
              </p>
              
              <p style={{ fontSize: '14px' }}>
                ⭐ Đánh giá: {game.rating} / 5
              </p>
            </div>

            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2ed573' }}>
                {game.price === 0 ? "MIỄN PHÍ" : `${game.price}$`}
              </span>
              <button style={{
                backgroundColor: '#1e90ff',
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Mua ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
```

---

### Các điểm cần lưu ý cho học viên:

1.  **Implicit Return trong Map:**
    *   Cần quan sát thấy sau dấu mũi tên `=>` là dấu ngoặc tròn `(`. Điều này có nghĩa là "trả về toàn bộ khối giao diện này cho mỗi phần tử".
2.  **Xử lý mảng con (`platforms`):**
    *   Trong JSON, `platforms` là một mảng `["PC", "PS5"]`.
    *   Để hiển thị ra màn hình cho đẹp (cách nhau bởi dấu phẩy), chúng ta dùng hàm của Javascript: `game.platforms.join(', ')`.
3.  **Logic "Miễn phí" (Free to play):**
    *   Dùng toán tử 3 ngôi: `{game.price === 0 ? "MIỄN PHÍ" : \`${game.price}$\`}`. Đây là cách xử lý dữ liệu thông minh ngay khi render.
4.  **Badge "HOT":**
    *   Dùng toán tử `&&`: `{game.isFeatured && <span>...</span>}`. Nghĩa là: Nếu `isFeatured` là `true` thì mới hiển thị thẻ `span`, nếu `false` thì bỏ qua.
5.  **Cấu trúc Flexbox/Grid:**
    *   Sử dụng CSS Grid (`repeat(auto-fill...)`) giúp 20 bản ghi tự động xuống dòng và co giãn đều trên màn hình điện thoại hoặc máy tính.

**Nhiệm vụ mở rộng:**
*   Thử lọc ra các game có `price < 50` để hiển thị.
*   Thử thay đổi màu sắc của điểm `rating` (Ví dụ: Trên 4.5 thì màu xanh lá, dưới 4.0 thì màu vàng).