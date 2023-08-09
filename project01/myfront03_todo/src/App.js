import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import './App.css';
import { useRef, useState } from 'react';

// useReducer test
import TestComp from './components/TestComp';
import TestComp01 from './components/TestComp';

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

function App() {
  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(mockTodo.length);

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

  const onUpdate = (targetId) => {
    setTodo(todo.map((it) => it.id === targetId ? { ...it, isDone: !it.isDone } : it));
  }

  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  }

  return (
    <div className='App'>
      <TestComp />

      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;