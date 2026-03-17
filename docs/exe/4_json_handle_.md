### 1. File: `categories.json` (5 danh mục)
File này định nghĩa các nhóm game chính trong hệ thống.

```json
[
  {
    "id": 1,
    "name": "Hành động (Action)",
    "description": "Trò chơi đòi hỏi kỹ năng, phản xạ và các pha chiến đấu kịch tính.",
    "totalGames": 120
  },
  {
    "id": 2,
    "name": "Nhập vai (RPG)",
    "description": "Người chơi hóa thân vào nhân vật, phát triển cốt truyện và kỹ năng.",
    "totalGames": 85
  },
  {
    "id": 3,
    "name": "Thể thao (Sports)",
    "description": "Mô phỏng các môn thể thao thực tế như bóng đá, bóng rổ, đua xe.",
    "totalGames": 50
  },
  {
    "id": 4,
    "name": "Chiến thuật (Strategy)",
    "description": "Đòi hỏi tư duy, lập kế hoạch và quản lý tài nguyên để giành chiến thắng.",
    "totalGames": 65
  },
  {
    "id": 5,
    "name": "Mô phỏng (Simulation)",
    "description": "Tái hiện các hoạt động thực tế như lái máy bay, xây dựng thành phố.",
    "totalGames": 40
  }
]
```

---

### 2. File: `games.json` (20 bản ghi)
File này chứa danh sách chi tiết các trò chơi. Lưu ý trường `categoryId` sẽ khớp với `id` ở file trên.

```json
[
  { "id": 101, "title": "God of War Ragnarök", "price": 69.99, "categoryId": 1, "isFeatured": true, "platforms": ["PS4", "PS5"], "rating": 4.9, "releaseDate": "2022-11-09" },
  { "id": 102, "title": "Spider-Man 2", "price": 69.99, "categoryId": 1, "isFeatured": true, "platforms": ["PS5"], "rating": 4.8, "releaseDate": "2023-10-20" },
  { "id": 103, "title": "Elden Ring", "price": 59.99, "categoryId": 2, "isFeatured": true, "platforms": ["PC", "PS5", "Xbox"], "rating": 4.9, "releaseDate": "2022-02-25" },
  { "id": 104, "title": "The Witcher 3: Wild Hunt", "price": 39.99, "categoryId": 2, "isFeatured": false, "platforms": ["PC", "PS4", "Switch"], "rating": 4.9, "releaseDate": "2015-05-19" },
  { "id": 105, "title": "FC 24 (FIFA)", "price": 69.99, "categoryId": 3, "isFeatured": true, "platforms": ["PC", "PS5", "Xbox"], "rating": 4.2, "releaseDate": "2023-09-29" },
  { "id": 106, "title": "NBA 2K24", "price": 59.99, "categoryId": 3, "isFeatured": false, "platforms": ["PS5", "Xbox"], "rating": 3.5, "releaseDate": "2023-09-08" },
  { "id": 107, "title": "Civilization VI", "price": 29.99, "categoryId": 4, "isFeatured": false, "platforms": ["PC", "iPad"], "rating": 4.6, "releaseDate": "2016-10-21" },
  { "id": 108, "title": "Age of Empires IV", "price": 49.99, "categoryId": 4, "isFeatured": true, "platforms": ["PC", "Xbox"], "rating": 4.7, "releaseDate": "2021-10-28" },
  { "id": 109, "title": "The Sims 4", "price": 0.00, "categoryId": 5, "isFeatured": true, "platforms": ["PC", "PS4"], "rating": 4.5, "releaseDate": "2014-09-02" },
  { "id": 110, "title": "Microsoft Flight Simulator", "price": 59.99, "categoryId": 5, "isFeatured": true, "platforms": ["PC", "Xbox"], "rating": 4.8, "releaseDate": "2020-08-18" },
  { "id": 111, "title": "Sekiro: Shadows Die Twice", "price": 59.99, "categoryId": 1, "isFeatured": false, "platforms": ["PC", "PS4"], "rating": 4.8, "releaseDate": "2019-03-22" },
  { "id": 112, "title": "Cyberpunk 2077", "price": 49.99, "categoryId": 2, "isFeatured": true, "platforms": ["PC", "PS5", "Xbox"], "rating": 4.4, "releaseDate": "2020-12-10" },
  { "id": 113, "title": "Gran Turismo 7", "price": 69.99, "categoryId": 3, "isFeatured": true, "platforms": ["PS4", "PS5"], "rating": 4.7, "releaseDate": "2022-03-04" },
  { "id": 114, "title": "Starcraft II", "price": 0.00, "categoryId": 4, "isFeatured": false, "platforms": ["PC"], "rating": 4.8, "releaseDate": "2010-07-27" },
  { "id": 115, "title": "Euro Truck Simulator 2", "price": 19.99, "categoryId": 5, "isFeatured": false, "platforms": ["PC"], "rating": 4.7, "releaseDate": "2012-10-18" },
  { "id": 116, "title": "Baldur's Gate 3", "price": 59.99, "categoryId": 2, "isFeatured": true, "platforms": ["PC", "PS5"], "rating": 5.0, "releaseDate": "2023-08-03" },
  { "id": 117, "title": "Resident Evil 4 Remake", "price": 59.99, "categoryId": 1, "isFeatured": true, "platforms": ["PC", "PS5", "Xbox"], "rating": 4.8, "releaseDate": "2023-03-24" },
  { "id": 118, "title": "Forza Horizon 5", "price": 59.99, "categoryId": 3, "isFeatured": true, "platforms": ["PC", "Xbox"], "rating": 4.8, "releaseDate": "2021-11-09" },
  { "id": 119, "title": "Total War: Warhammer III", "price": 59.99, "categoryId": 4, "isFeatured": false, "platforms": ["PC"], "rating": 4.3, "releaseDate": "2022-02-17" },
  { "id": 120, "title": "Cities: Skylines II", "price": 49.99, "categoryId": 5, "isFeatured": true, "platforms": ["PC", "PS5"], "rating": 3.9, "releaseDate": "2023-10-24" }
]
```

---

### Ghi chú:
1.  **Tính liên kết:** Các giá trị `categoryId` trong file `games.json` (từ 1 đến 5) tương ứng chính xác với các `id` danh mục trong file `categories.json`.
2.  **Định dạng:** Tất cả các chuỗi (string) đều nằm trong ngoặc kép `" "`, các số (number) và boolean (`true`/`false`) viết trực tiếp.
3.  **Cấu trúc mảng:** Toàn bộ file được bọc trong cặp ngoặc vuông `[ ]`, mỗi phần tử bên trong là một đối tượng `{ }`. Đây là định dạng chuẩn để React có thể dùng hàm `.map()` để render dữ liệu.