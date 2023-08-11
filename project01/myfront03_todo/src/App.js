import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import './App.css';
import { useReducer, useRef } from 'react';

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

// ** React.memo
// => 컴포넌트의 불필요한 리랜더링 방지 (Header 에 적용)
// => React.memo(메모이제이션 하려는 컴포넌트)
//    인자로 전달된 컴포넌트를 메모이제이션 된 컴포넌트로 return
// => 컴포넌트 선언과 동시에 적용하는것 도 가능
//    const comp = React.memo(() => {....})

// => 아래의 onUpdate, onDelete 함수를 리랜더링 할때마다 재생성 하지 않도록 적용.
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

    // [newItem, ...todo] =>
    case "Create": { return [action.newItem, ...state] }

    case "Update": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it)
    }
    /* => const onUpdate = (targetId) => {
setTodo(todo.map((it) => it.id === targetId ? { ...it, isDone: !it.isDone } : it));
} 에서 todo.map() = state.map() / targetId = action.targetId */

    case "Delete": { return state.filter((it) => it.id !== action.targetId); }
    /* => const onDelete = (targetId) => {
        setTodo(todo.filter((it) => it.id !== targetId));
      } 에서 todo.filter() = state.filter / targetId = action.targetId */

    default:
      return state;
  }
}

function App() {

  /* const [todo, setTodo] = useState(mockTodo); */
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  // = > const [State 변수, 상태변화촉발 함수] = useReducer(상태변화함수, 초기값);

  const idRef = useRef(mockTodo.length);

  /*
  const onCreate = (content) => {
        const newItem = {
          id: idRef.current,
          content: content,
          isDone: false,
          createDate: new Date().getTime()
        }
        setTodo([newItem, ...todo]);
        idRef.current += 1;
  }
 */
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
  // => 상태값 변경 부분을 reducer() 에게 맡김
  // => dispatch 호출해서 action 값(type, data) 전달

  /*
  const onUpdate = (targetId) => {
      setTodo(todo.map((it) => it.id === targetId ? { ...it, isDone: !it.isDone } : it));
    }
  */
  const onUpdate = (targetId) => {
    dispatch({
      type: "Update",
      targetId
      // => targetId: targetId
    });
  }
  /*
  const onDelete = (targetId) => {
      setTodo(todo.filter((it) => it.id !== targetId));
    }
    */
  const onDelete = (targetId) => {
    dispatch({
      type: "Delete",
      targetId
    });
  }

  return (
    <div className='App'>
      {/* <TestComp /> */}

      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;