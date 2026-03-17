import {useState} from "react";
import type {Product} from "./ProductCard.tsx";
import ProductCard from "./ProductCard.tsx";

const ProductList = () => {
    const [count, setCount] = useState<number>(0);
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "iPhone 15 Pro", price: 28000000, isLiked: false },
        { id: 2, name: "MacBook Air M2", price: 24000000, isLiked: false },
        { id: 3, name: "AirPods Pro 2", price: 5000000, isLiked: true },
    ]);

    // HÀM CẬP NHẬT STATE: Xử lý khi người dùng nhấn nút "Yêu thích"
    const handleToggleLike = (productId: number) => {
        // Tạo một mảng mới dựa trên mảng cũ để React nhận biết sự thay đổi
        const updatedProducts = products.map(p => {
            if (p.id === productId) {
                return { ...p, isLiked: !p.isLiked }; // Đảo ngược trạng thái isLiked
            }
            return p;
        });
        // Cập nhật State -> React sẽ tự động render lại toàn bộ danh sách
        setProducts(updatedProducts);
    };

    return (
        <>
            <div style={{ padding: '20px' }}>
                <h1>Cửa hàng Công nghệ</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Duyệt qua mảng sản phẩm trong State để tạo ra các Component Con */}
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}         // 'key' giúp Virtual DOM nhận diện phần tử thay đổi
                            product={product}        // Truyền dữ liệu qua Prop 'product'
                            onToggleLike={handleToggleLike} // Truyền hàm xử lý qua Prop 'onToggleLike'
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductList;