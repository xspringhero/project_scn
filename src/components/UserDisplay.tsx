interface UserDisplayProps {
    displayName: string;    // Kiểu chuỗi (String)
    clickCount: number;     // Kiểu số (Number)
    onUpdateClick: () => void; // Hàm xử lý khi nhấn nút (không trả về giá trị)
}
const UserDisplay = ({ displayName, clickCount, onUpdateClick }: UserDisplayProps) => {
    return (
        <>
            <div>User Display</div>
            <div>Fullname: {displayName}</div>
            <div>Views: {clickCount}</div>
            <button onClick={onUpdateClick}>
                Nhấn để tăng số lần tương tác (thay đổi giá trị của biến trong component cha)
            </button>
        </>
    );
}
export default UserDisplay;