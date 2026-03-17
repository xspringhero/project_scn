### Interface: BÀI GIẢI CHI TIẾT

**Lời giải bài 1:**
```tsx
interface Pet {
  name: string;
  age: number;
}

const PetList = () => {
  const myPets: Pet[] = [
    { name: "Lu", age: 2 },
    { name: "Miu", age: 3 },
    { name: "Bông", age: 1 }
  ];

  return (
    <ul>
      {myPets.map((pet, index) => (
        <li key={index}>Tên: {pet.name} - Tuổi: {pet.age}</li>
      ))}
    </ul>
  );
};
```

**Lời giải bài 2:**
```tsx
interface Phone {
  model: string;
  brand: string;
  price: number;
}

const PhoneStore = () => {
  const phones: Phone[] = [
    { brand: "Apple", model: "iPhone 15", price: 1000 },
    { brand: "Samsung", model: "Galaxy S23", price: 900 }
  ];

  return (
    <div>
      {phones.map((phone, index) => (
        <div key={index}>
          {phone.brand} {phone.model} - Giá: {phone.price} $
        </div>
      ))}
    </div>
  );
};
```

**Lời giải bài 3:**
```tsx
interface Order {
  id: number;
  productName: string;
  isDelivered: boolean;
}

const OrderManager = () => {
  const orders: Order[] = [
    { id: 1, productName: "Giày Nike", isDelivered: true },
    { id: 2, productName: "Áo thun", isDelivered: false }
  ];

  return (
    <div>
      {orders.map(order => (
        <p key={order.id}>
          Đơn hàng {order.productName}: {order.isDelivered ? "Đã giao" : "Chưa giao"}
        </p>
      ))}
    </div>
  );
};
```