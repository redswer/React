import './App.css';
import { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// ** Redux 
// 실습2. Redux 를 사용한 코드
// => redux 와 react-redux 라이브러리 추가
//    npm install  redux react-redux -> 비추( createStore deprecated 됨 )
//    npm install redux@4.1.2 react-redux -> 추천
// 1) reducer
// 2) Store 생성
// 3) Left3 에서 Direct 로 number 사용 : useSelector
// 4) Right3 의 button onClick 으로 number 값 증가 
//    ( dispatch 적용 )

// 1) reducer
// => store 의 state 값을 어떻게 변경할 것인지 결정
// => 인자: 현재 state 값과 state 값을 어떻게 변경할 것인지에 대한 요청인 action 
// => return: 새로운 state 값
function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      number: 1,
      number2: 100
    }
  }

  const newState = { ...currentState }
  if (action.type === 'PLUS') {
    newState.number++;
    newState.number2++;
  }

  return newState;
}

// 2) store 생성
// => reducer 를 생성자 주입(인자로사용)
const store = createStore(reducer);

function App() {
  // const [number, setNumber] = useState(1);
  // => 리덕스가 상태값 관리를 하므로 필요없음

  return (
    <div id='container'>
      <h1>Root</h1>
      <div id='grid'>
        {/* ** Provider
        => state 값을 제공 받을 컴포넌트들을 감싸즌다. 
        => store Props를 반드시 정의한다  */}
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

function Left1() {
  return (
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  );
}

function Left2() {
  console.log('** Left2 **');

  return (
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  );
}

function Left3() {
  console.log('** Left3 **');

  function f(state) { return state.number }
  const number = useSelector(f);
  // => store 의 state 값 사용을 할 수 있게해줌 ( number 값을 무선으로 연결시켜줌 )
  //    인자인 콜백함수를 이용해서 사용하려는 state 값을 선택
  // => const number = useSelector((state)=> state.number);
  const number2 = useSelector((state) => state.number2)

  return (
    <div>
      <h1>Left3: number = {number}, number2 = {number2}</h1>
    </div>
  );
}


function Right1() {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}

function Right2() {
  console.log('** Right2 **');

  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}

function Right3() {
  console.log('** Right3 **');

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Right3</h1>
      <input type='button' value='Increase'
        onClick={() => dispatch({ type: 'PLUS' })} />
    </div>
  );
}

export default App;