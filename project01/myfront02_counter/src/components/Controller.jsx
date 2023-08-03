// controller : 버튼이 6개 있는 컴포넌트 (-1, -10, -100, +100, +10, +1)

function Controller({ onChangeState }) {
    console.log('Controller update');

    return (
        <div>
            {/* 매개변수를 전달하기 위해 onClick 이벤트 핸들러를 작성해서 함수를 call */}
            <button onClick={() => onChangeState(-1)}>-1</button>
            <button onClick={() => onChangeState(-10)}>-10</button>
            <button onClick={() => onChangeState(-100)}>-100</button>
            <button onClick={() => onChangeState(100)}>+100</button>
            <button onClick={() => onChangeState(10)}>+10</button>
            <button onClick={() => onChangeState(1)}>+1</button>
        </div>
    );
}

export default Controller;