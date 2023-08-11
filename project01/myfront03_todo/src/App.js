import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import './App.css';
import { useReducer, useRef, useCallback } from 'react';

// ** 최적화
// => 웹서비스의 성능을 개선하는 기술
// => 불필요하게 낭비되는 연산을 줄여 랜더링의 성능을 높여줌.

// ** 리액트의 연산 최적화 
// => 메모이제이션(Memoization) 기법
//    직역하면 메모하는 방법 으로
//    특정 입력에 대한 결과를 저장했다가, 동일한 요청이 들어오면
//    저장해둔 결과값을 제공하므로 빠르게 응답하며
//    불필요한 연산을 줄여주는 기술
// => 이러한 기능을 알고리즘에서는 Dynamic(동적) Programming (DP) 라함.
// => 리액트의 연산 최적화 기법
//  - useMemo() , React.memo, useCallback()

// ** useMemo()
// => 메모이제이션(Memoization) 기법을 이용해 연산의 결과값을
//    기억헤 두었다가 필요할때 사용함으로 불필요한 함수호출을 줄여주는 훅.  
// => const value = useMemo(callback, [의존성배열]);
//    의존성배열 의 값이 바뀌면 callback 함수를 실행하고 결과값 return
// => TodoList 컴포넌트에 analyzeTodo 함수 추가 하고 Test

// ** useCallback()
// => 함수의 불필요한 재생성 방지
//    컴포넌트 리랜더링시 내부의 함수를 재생성하지 않도록 메모이제이션함.  
// => useCallback(callback, [의존성배열])
//    [의존성배열] 이 변경되면 callback 함수를 재생성 return 함.
// => useCallback(callback, [])
//    비어있는 배열을 전달하면 callback 함수는 마운트시에만 생성되고, 이후에는 재생성 되지않음
// => 주의사항
//    이때 callback 함수내부에서 State 변수에 접근한다면, 
//    마운트시의  State 변수값만 사용할 수있으므로 주의해야 하며,
//    이것을 해결하려면 "함수형 업데이트" 기능을 이용해야함
//   ( 단, 아래코드처럼 useReducer() 를 이용하는경우에는 무관함 )
// => 아래의 onUpdate, onDelete 함수를 리랜더링 할때마다 재생성 하지 않도록 적용.

// ** React.memo
// => 컴포넌트의 불필요한 리랜더링 방지 (Header 에 적용)
// => React.memo(메모이제이션 하려는 컴포넌트)
//    인자로 전달된 컴포넌트를 메모이제이션 된 컴포넌트로 return
// => 컴포넌트 선언과 동시에 적용하는것 도 가능
//    const comp = React.memo(() => {....})

//=================================================

// ** TodoList (일정관리 앱) 3.
// => useMemo(), useCallback(), React.memo 적용


const mockTodo = [{
  id: 0,
  isDone: false,
  content: 'React 공부하기',
  createDate: new Date().getTime()
},
{
  id: 1,
  isDone: false,
  content: 'Javascript 공부하기',
  createDate: new Date().getTime()
},
{
  id: 2,
  isDone: false,
  content: 'Java 공부하기',
  createDate: new Date().getTime()
},
{
  id: 3,
  isDone: false,
  content: 'MySQL 예습하기',
  createDate: new Date().getTime()
},
{
  id: 4,
  isDone: false,
  content: 'Spring 예습하기',
  createDate: new Date().getTime()
}];

function reducer(state, action) {
  switch (action.type) {
    case "Create": { return [action.newItem, ...state] }

    case "Update": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it)
    }

    case "Delete": { return state.filter((it) => it.id !== action.targetId); }

    default: return state;
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(mockTodo.length);

  const onCreate = (content) => {
    dispatch({
      type: "Create",
      newItem: {
        id: idRef.current,
        content: content,
        isDone: false,
        createDate: new Date().getTime()
      }
    });
    idRef.current += 1;
  }

  console.log('onCreate, todo.length = ' + todo.length);

  // ** useCallback 적용
  // => 비어있는 배열을 두번째 인자로 전달하여 마운트시에만 생성되도록 함.
  // => useReducer() 를 이용하므로 State 변수에 직접 접근하지 않기때문에
  //    "함수형 업데이트" 기능을 사용하지 않아도 됨.

  // => useCallback(callback, [의존성배열])
  //    [의존성배열] 이 변경되면 callback 함수를 재생성 return 함.
  // => useCallback(callback, [])
  //    비어있는 배열을 전달하면 callback 함수는 마운트시에만 생성되고, 이후에는 재생성 되지않음

  /*
  const onUpdate = (targetId) => {
      dispatch({
        type: "Update",
        targetId
      });
    }
    */
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "Update",
      targetId
    });

    console.log('onUpdate_useCallback, todo.length = ' + todo.length);
    // useCallback 의 첫 번째 인자인 콜백함수는 최초 생성시 전달받은 State변수값(todo.length)만 가지고 있음을 확인
    // => todo.length 는 todo 배열의 내용(일정)이 추가되어도 초기값인 5로 고정됨

    // 반면에 밑의 주석에서 useCallback 을 적용하지 않은 onDelete에서는 todo.length 가 정상적으로 출력됨
    // => 일정을 삭제할 때 마다 새로운 state 값을 전달받아 정확한 길이를 출력함(useCallback을 적용하지 않은 onUpdate도 동일)
  }, []);

  /*   const onDelete = (targetId) => {
      dispatch({
        type: "Delete",
        targetId
      });
    console.log('onDelete, todo.length = ' + todo.length);
    } */

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "Delete",
      targetId
    });
  }, []);

  console.log('** App Update (리랜더링)됨 **');

  return (
    <div className='App'>
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;