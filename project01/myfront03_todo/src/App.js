import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import './App.css';
import { useReducer, useRef } from 'react';

// useReducer test
/*
import TestComp from './components/TestComp';
import TestComp01 from './components/TestComp';
*/

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