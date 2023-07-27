function Header(props) {
    return (
        <header>
            <h1>** Header **</h1>
            {/* 객체 전달 */}
            <p>name : {props.head.name}</p>
            <p>age : {props.head.age}</p>
            <p>country : {props.head.country}</p>
        </header>
    );
};

export default Header;