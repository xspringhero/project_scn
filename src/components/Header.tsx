import './Header.css';
import {useEffect, useState} from "react";

const Header = () => {
    // Xử lý thêm
    const [name] = useState<string>('T2512E');
    const [email] = useState<string>('hung@gmail.com');
    const [countNumber, setCountNumber] = useState<number>(0);

    const [text, setText] = useState<string>('');

    function demo(){
        setCountNumber(countNumber + 1);
    }

    useEffect(function (){
        document.title = text || 'Hello World';
    }, [text])

    return (
        <>
            <header><h1>Welcome {name}</h1></header>
            <div>Email: {email}</div>
            <div>Count {countNumber}</div>
            <button onClick={demo}>Click me pls</button>

            <div>
                <input type="text"
                    onChange={(e) => setText(e.target.value)}
                />
                <p>Giá trị hiện tại: {text}</p>
            </div>
        </>
    );
}

export default Header;