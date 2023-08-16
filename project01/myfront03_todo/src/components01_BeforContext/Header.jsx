import './Header.css';
import React from 'react';

const Header = () => {
    console.log('** Header Update **');

    return (
        <div className="Header">
            {/* 윈도우 이모지 : window + . */}
            <h3>오늘은 📅</h3>

            <h1>{new Date().toDateString()}</h1>
            {/* => toDateString() :  날짜를 문자열로 */}
        </div>
    );
}

// export default Header;
export default React.memo(Header);
// => React.memo
// 컴포넌트의 불필요한 리랜더링을 방지해주는 고차 컴포넌트
// 리랜더링의 기준은 부모에서 전달된 Props가 변경된 경우에만 리랜더링됨

// => 고차 컴포넌트 (HOC: High Order Component)
//    컴포넌트 기능을 재사용 하기위한 리액트 고급기슬
//    인자로 전달된 컴포넌트에 새로운 기능을 추가해
//    더욱 강화된 컴포넌트를 return 하는 컴포넌트(함수) 를 말하며
//    이때 return 되는 강화된 컴포넌트를 Enhanced(강화된, 향상된) Component 라함.
// => const enhanced_Component = React.memo(Header)