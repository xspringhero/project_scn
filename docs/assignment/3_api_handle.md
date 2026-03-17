**Bước 3: Xử lý gọi API thật và hiển thị Modal**.

### 3.1. Lấy YouTube API Key
Để gọi được dữ liệu từ YouTube, bạn cần một API Key:
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Tạo một Project mới.
3. Vào mục **Library**, tìm kiếm **"YouTube Data API v3"** và nhấn **Enable**.
4. Vào mục **Credentials** -> **Create Credentials** -> **API Key**.
5. Copy mã này lại để dùng ở bước sau.

---

### 3.2. Cấu hình Axios để gọi API
Tạo file `src/api/youtube.js` để quản lý việc gọi API tập trung:

```javascript
import axios from 'axios';

const KEY = 'DÁN_API_KEY_CỦA_BẠN_VÀO_ĐÂY';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 12,
    key: KEY,
    type: 'video'
  }
});
```

---

### 3.3. Xây dựng Component VideoModal
Tạo file `src/components/VideoModal.jsx`. Chúng ta sẽ dùng iframe của YouTube để phát video.

```jsx
import React from 'react';
import { X } from 'lucide-react';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="relative bg-white w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl">
        {/* Nút đóng */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full z-10"
        >
          <X size={24} />
        </button>

        {/* Video Player */}
        <div className="aspect-video">
          <iframe 
            src={videoSrc} 
            title={video.snippet.title}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay"
          />
        </div>

        {/* Thông tin video */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{video.snippet.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{video.snippet.channelTitle}</p>
          <p className="text-gray-700 line-clamp-3">{video.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
```

---

### 3.4. Hoàn thiện Logic trong App.jsx
Bây giờ chúng ta sẽ kết nối tất cả lại, xử lý Tìm kiếm, Phân trang và Modal.

```jsx
import React, { useState, useEffect } from 'react';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('ReactJS tutorial'); // Tìm mặc định
  
  // Lưu token phân trang
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  // Hàm gọi API
  const fetchVideos = async (query, pageToken = '') => {
    setLoading(true);
    try {
      const response = await youtube.get('/search', {
        params: {
          q: query,
          pageToken: pageToken
        }
      });
      setVideos(response.data.items);
      setNextPageToken(response.data.nextPageToken || null);
      setPrevPageToken(response.data.prevPageToken || null);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chạy lần đầu khi load trang
  useEffect(() => {
    fetchVideos(searchTerm);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchVideos(term);
  };

  const handlePageChange = (direction) => {
    const token = direction === 'next' ? nextPageToken : prevPageToken;
    if (token) {
      fetchVideos(searchTerm, token);
      window.scrollTo(0, 0); // Cuộn lên đầu trang khi qua trang mới
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-40">
        <h1 className="text-center text-2xl font-bold text-red-600">MyTube Search</h1>
      </nav>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <div className="flex justify-center my-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <VideoList 
          videos={videos} 
          onVideoSelect={(video) => setSelectedVideo(video)}
          onPageChange={handlePageChange}
          hasNextPage={!!nextPageToken}
          hasPrevPage={!!prevPageToken}
        />
      )}

      {/* Modal hiển thị khi có video được chọn */}
      <VideoModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </div>
  );
}

export default App;
```

---

### Kiểm tra lại thành quả:
1. Bạn nhập từ khóa và nhấn **Tìm**.
2. Danh sách video thật từ YouTube hiện ra.
3. Nhấn **Sau** hoặc **Trước** để chuyển trang (sử dụng `nextPageToken` của YouTube).
4. Click vào một Video, một cái **Modal** xịn xò sẽ hiện ra và video tự động phát.

**Lưu ý:** Nếu bạn dùng hết hạn mức của API Key (YouTube cho 10,000 đơn vị miễn phí mỗi ngày), API sẽ báo lỗi 403.
