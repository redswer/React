// ** 컴포넌트 LifeCycle
// => 컴포넌트는 개념적으로 props를 input으로 하고
//    UI가 어떻게 보여야 하는지 정의하는 React Element를 output으로 하는 함수.
// => UI를 구성하기 위해서는 화면에 컴포넌트를 
//    그리고(Mounting), 갱신하고(Updating), 지워야(Unmounting) 함. 
// => 컴포넌트는 이 과정에서 각 프로세스 진행단계 별로 Lifecycle 함수로 불리는 특별한 함수가 실행됨.
//    개발자는 이를 재정의하여 컴포넌트를 제어할 수 있음. (클래스컴포넌트)

// => Mounting : 컴포넌트를 페이지에 처음 랜더링 할때
// => Updating : State, Props 값이 바뀌거나 부모컴포넌트가 리랜더 하면서 자신도 리랜더 될때
// => Unmounting : 컴포넌트가 페이지에서 제거될때 (더이상 랜더링하지않음)

// => 함수 컴포넌트에서는 useEffect 를 이용하여 제어함.

// ** useEffect
// => 어떤 값이 변경될때 마다 특정코드를 실행하는 리액트훅이며
//    이것을 "특정값을 검사한다" 라고 표현함
// => 예를 들면 State 값이 바뀔때 마다 변경된 값을 콘솔에 출력하게 할 수 있음

// => useEffect(callback_함수, [deps]_의존성 배열)
//    두번쨰 인자인 의존성 배열요소의 값이 변경되면 첫번째 인자인 콜백함수를 실행함   

// ** Test
// => 1) State 변수인 count 값이 바뀌면 바뀐값을 콘솔로 출력한다.
// => 2) State 변수 text 추가후 확인하기.
// => 3) LifeCycle 제어
// => 4) Mount 제어
// => 5) Update(리랜더링)시에만 호출하도록 변경
// => 6) UnMount 제어

import './App.css';
import Controller from './components/Controller';
import Viewer from './components/Viewer';

import { useEffect, useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const onChangeState = (num) => { setCount(count + num) }


  // 1) useEffect 적용
  /* State 변수인 count 값이 바뀌면 바뀐 값을 콘솔로 출력함 / count 값 초기화할 때도 감지함 */
  // useEffect(() => {console.log('** useEffect test 1: count => ' + count)})


  // 2) State 변수 text 추가 후 확인하기
  const [text, setText] = useState('test');
  const onChangeText = (e) => { setText(e.target.value) }
  useEffect(() => { console.log('** useEffect test 2: count => ' + count + ',' + text) }, [text]);
  // => [text] : count 값 변경시에는 출력안됨
  // => [count] : text 값 변경시에는 출력안됨
  // => [count, text] : count 또는 text 변경시 출력됨


  // 3) 두 번째 인수가 없는 useEffect 정의 후 비교
  /* 콜백함수를 실행시켜주는 조건값이 제시되지 않은 경우 렌더링 할 때마다 호출됨 */
  useEffect(() => { console.log('** useEffect test 3: 배열 없음 count =>' + count) });


  // 4) Mount 제어
  /* - useEffect 를 추가하고 두 번째 인자는 빈 배열을 전달
     - useEffect 에 빈 배열을 전달하면 마운트 시점에만 콜백함수 실행 (처음 한 번만 실행됨 => Mount 제어세 이용) */
  useEffect(() => { console.log('** useEffect test 4: 빈 배열 count => ' + count) }, []);


  // 5) Update(리 랜더링)시에만 호출하도록 변경
  /* 위쪽의 3) 랜더링에서 최초 렌더링(마운트 시점)만 제외시켜주면 됨 */

  // 최초 랜더링인지 판별하는 변수를 정의하고 초기값을 false로 지정 (Ref 객체로 생성)
  const didMountRef = useRef(false);

  useEffect(() => {

    // 최초 랜더링(Mount)인지 확인하고, 아닌 경우에만 출력
    if (!didMountRef.current) {
      didMountRef.current = true;
      // 출력하지 않고 return(콜백함수 종료)
      return;

    } else {
      console.log('** useEffect test 5: Update => ' + count + ',' + text);
    }
  });


  // 6) unMount 제어
  /* 클린업(clean up) : 특정 함수가 실행되고 종료된 후, 미처 정리하지 못한 사항을 정리
     클린업 필요성 test => useEffect (setInterval 사용하고 배열 없는) 추가 */
  useEffect(() => { setInterval(() => { console.log('** 깜빡 **') }, 1000) });
  // => 두번째 인자 배열이 없으므로 랜더링 할때마다 콜백함수 실행됨
  // => 콜백함수에서 호출한 setInterval 에 의해 1초마다 콘솔출력됨
  // => 그러나 + , - 클릭으로 리랜더링이 일어나면, 1초 상관없이 출력됨
  // => 콜백함수에서 호출한 setInterval 에 의해 1초마다 콘솔출력됨
  // => 이유 : setInterval 을 계속 호출하므로 복수의 setInterval 이 계속 생성되기때문
  //           호출한 setInterval 을 종료시켜주지 않았기 때문
  //          (setInterval 은 clearInterval 을 호출해서 종료시켜야 멈춤)
  // => 해결 : useEffect 의 클린업 기능

  // => 클린업 함수
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('** 깜빡 **');
    }, 1000);

    return () => {
      console.log('** 클린업 함수 **');
      clearInterval(intervalId);
    }
  });
  //    - useEffect 의 콜백함수에서 return 하는 함수
  //    - 콜백함수를 재호출하기 전에 실행됨,
  // => 그러므로 이를 이용하여 리랜더링 할때마다 새 setInterval 생성하고 
  //    기존 setInterval 은 삭제하도록 할 수 있다.  

  return (
    <div className='App'>
      <h2>* Simple Counter *</h2>
      <section><input value={text} onChange={onChangeText} /></section>
      <section><Viewer count={count} /></section>
      <section><Controller onChangeState={onChangeState} /></section>
    </div>
  );
}

export default App;