**Bước 2: Xây dựng giao diện hiển thị**.

Tạo các Component UI bằng Tailwind CSS. Sử dụng dữ liệu giả (mock data) để bạn có thể thấy được giao diện trước khi kết nối với API.

### 2.1. Tạo Component SearchBar
Tạo file `src/components/SearchBar.jsx`. Đây là thanh tìm kiếm nằm ở trên cùng.

```jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Tìm kiếm video trên YouTube..."
          className="w-full px-5 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute left-4 text-gray-400" size={20} />
        <button
          type="submit"
          className="ml-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Tìm
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
```

### 2.2. Tạo Component VideoCard
Tạo file `src/components/VideoCard.jsx`. Mỗi card sẽ hiển thị hình ảnh thu nhỏ, tiêu đề và tên kênh.

```jsx
import React from 'react';

const VideoCard = ({ video, onVideoSelect }) => {
  const { snippet } = video;
  
  return (
    <div 
      onClick={() => onVideoSelect(video)}
      className="cursor-pointer group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img 
          src={snippet.thumbnails.medium.url} 
          alt={snippet.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Video Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600">
          {snippet.title}
        </h3>
        <p className="text-sm text-gray-600">{snippet.channelTitle}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(snippet.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
```

### 2.3. Tạo Component VideoList và Pagination
Tạo file `src/components/VideoList.jsx`. Component này sẽ chứa lưới các video và nút phân trang.

```jsx
import React from 'react';
import VideoCard from './VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoList = ({ videos, onVideoSelect, onPageChange, hasNextPage, hasPrevPage }) => {
  return (
    <div className="container mx-auto px-4">
      {/* Grid danh sách video */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard 
            key={video.id.videoId || video.id} 
            video={video} 
            onVideoSelect={onVideoSelect} 
          />
        ))}
      </div>

      {/* Phân trang đơn giản */}
      <div className="flex justify-center items-center space-x-4 my-10">
        <button
          onClick={() => onPageChange('prev')}
          disabled={!hasPrevPage}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft size={20} /> Trước
        </button>
        <button
          onClick={() => onPageChange('next')}
          disabled={!hasNextPage}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Sau <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default VideoList;
```

### 2.4. Ghép nối vào App.jsx (Dùng dữ liệu mẫu)
Cập nhật file `src/App.jsx` để kiểm tra giao diện:

```jsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';

// Dữ liệu mẫu để test UI
const MOCK_VIDEOS = [
  {
    id: { videoId: '1' },
    snippet: {
      title: "Học ReactJS cho người mới bắt đầu",
      channelTitle: "Code Dạo",
      thumbnails: { medium: { url: "https://picsum.photos/seed/1/400/225" } },
      publishedAt: "2023-10-01"
    }
  },
  {
    id: { videoId: '2' },
    snippet: {
      title: "Tailwind CSS Tutorial",
      channelTitle: "Design Lab",
      thumbnails: { medium: { url: "https://picsum.photos/seed/2/400/225" } },
      publishedAt: "2023-11-15"
    }
  },
  // Thêm vài cái nữa để test grid...
];

function App() {
  const [videos, setVideos] = useState(MOCK_VIDEOS);

  const handleSearch = (term) => {
    console.log("Đang tìm kiếm:", term);
    // Logic gọi API sẽ nằm ở bước 3
  };

  const handleVideoSelect = (video) => {
    console.log("Video được chọn:", video);
    // Logic mở Modal sẽ nằm ở bước 3
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm py-4">
        <h1 className="text-center text-2xl font-bold text-red-600">MyTube Search</h1>
      </nav>
      
      <SearchBar onSearch={handleSearch} />
      
      <VideoList 
        videos={videos} 
        onVideoSelect={handleVideoSelect}
        onPageChange={(dir) => console.log("Chuyển trang:", dir)}
        hasNextPage={true}
        hasPrevPage={false}
      />
    </div>
  );
}

export default App;
```

---
**Kết quả bước 2:** Bạn sẽ thấy một giao diện có thanh tìm kiếm đẹp mắt và các card video xếp theo lưới (grid) phản ứng tốt với mọi màn hình.

**Bạn đã sẵn sàng để chuyển sang Bước 3: Xử lý gọi API để lấy dữ liệu thật và làm Modal chưa?** (Bước này chúng ta sẽ cần API Key của Google).