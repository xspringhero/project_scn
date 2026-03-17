// Định nghĩa cấu trúc của một đối tượng Sản phẩm
export interface Product {
    id: number;
    name: string;
    price: number;
    isLiked: boolean; // 1 | 0
}

interface ProductCardProps {
    product: Product;           // Dữ liệu của một sản phẩm
    onToggleLike: (id: number) => void; // Một hàm xử lý sự kiện truyền từ Cha xuống
}

const ProductCard = ({product, onToggleLike}: ProductCardProps) => {
    return (
        <>
            <div style={{
                border: '1px solid #ddd',
                padding: '15px',
                margin: '10px',
                borderRadius: '8px',
                backgroundColor: product.isLiked ? '#fff0f0' : '#fff'
            }}>
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()}</p>
                <button onClick={() => onToggleLike(product.id)}>
                    {product.isLiked ? '❤️ Đã thích' : '🤍 Yêu thích'}
                </button>
            </div>
        </>
    )
}

export default ProductCard;