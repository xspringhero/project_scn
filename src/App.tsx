import './App.css'
import {useEffect, useState} from "react";

interface User {
    id: number;
    name: string;
    email: string;
}
const App = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = () => {
        setIsLoading(true);
        setError(null);

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
        xhr.onreadystatechange = ()=> {
            if(xhr.readyState === 4 && xhr.status === 200){
                try {
                    // Parse dữ liệu từ chuỗi JSON sang Object/Array
                    const data = JSON.parse(xhr.responseText);
                    setUsers(data);
                    setError(null);
                } catch (e) {
                    setError("Lỗi định dạng dữ liệu từ Server");
                }
            }else {
                setError("Lỗi kết nối mạng. Không thể gọi API.");
            }
            setIsLoading(false);
        };
        xhr.send();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

  return (
    <>
        <div style={{ padding: '20px' }}>
            <h1>Danh sách người dùng (React + TS)</h1>

            {/* Hiển thị trạng thái Loading */}
            {isLoading && <p>Đang tải dữ liệu...</p>}

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

            {/* Hiển thị dữ liệu ra View dùng hàm .map() */}
            {!isLoading && !error && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {users.map((user) => (
                        <li
                            key={user.id}
                            style={{
                                border: '1px solid #ccc',
                                margin: '10px 0',
                                padding: '10px',
                                borderRadius: '8px'
                            }}
                        >
                            <strong>{user.name}</strong> - {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
  )
}
export default App;
