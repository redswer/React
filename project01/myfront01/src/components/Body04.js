// ** Props 와 State **
// => State 도 값이므로 Props 로 전달 가능
// => Body 에 Child 컴포넌트 만들고 전달 Test
// => 전달된 부모 State 값이 변하면 Child 컴포넌트도 리랜더링 됨.
// => state 를 전달하지않은 경우와 비교
//    부모가 리랜더링 되면 Child 컴포넌트도 리랜더링됨  

import { useState } from 'react';
import './Body.css';

// child 컴포넌트 만들기
function Viewer(props) {
    console.log(props);

    // 부모로부터 전달받은 값이 짝수/홀수 인지 출력
    /*
        if (props.number % 2 == 0) {
            return (
                <div>짝수 <p>여기는 child 컴포넌트</p></div>
            );
        } else {
            return (
                <div>홀수 <p>여기는 child 컴포넌트</p></div>
            );
        }
     */
    return (
        <div>{props.number % 2 == 0 ? '짝수' : '홀수'}<p>여기는 child 컴포넌트</p></div>
    );
}

function Body() {
    const [number, setNumber] = useState(0);
    const onIncrease = () => { setNumber(number + 1) }
    const onDecrease = () => { setNumber(number - 1) }

    // ** 컴포넌트의 Update 확인
    console.log('** 컴포넌트의 Update');

    return (
        <div className='body'>
            <h2>** Props 와 State Test **</h2>
            <h3>state 변수 : number = {number}</h3>
            <p>Props 로 number 값을 Child 컴포넌트에 전달</p>
            <Viewer number={number} />

            <div>
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
            </div>
        </div>
    );
}

export default Body;