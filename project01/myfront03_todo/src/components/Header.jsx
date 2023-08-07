import './Header.css';

const Header = () => {
    return (
        <div className="Header">
            {/* 윈도우 이모지 : window + . */}
            <h3>오늘은 📅</h3>

            <h1>{new Date().toDateString()}</h1>
            {/* => toDateString() :  날짜를 문자열로 */}
        </div>
    );
}

export default Header;