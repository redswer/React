import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import './App.css';
import { useRef, useState } from 'react';

// 2. Mock Data
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
  // 3.1) 배열을 리스트로 랜더링하기
  //  -> Mock Data mockTodo 를 state 변수 todo 로
  //  -> todo 를 Props 이용하여 TodoList 로 전달
  // => TodoList
  //  -> 전달받은 배열을 map 메서드로 1건씩 TodoItem 으로 전달
  //    ( map 을 이용해 컴포넌트 반복하기 )
  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(mockTodo.length);


  // 3.2) 일정 추가(Create) 함수 생성
  // new 일정을 인자로 전달받아 배열에 저장
  // 생성된 함수를 TodoEditor에 컴포넌트로 전달
  const onCreate = (content) => {
    // => 추가할 일정 객체 생성
    const newItem = {
      id: idRef.current,
      content: content,
      isDone: false,
      createDate: new Date().getTime()
    }

    setTodo([newItem, ...todo]);
    idRef.current += 1;
    /* => 생성된 객체를 state 변수 todo 배열에 적용
        [todo 배열 + newItem]
        단, 출력 순서 등을 고려해서 newItem 을 index 값이 0이 되도록 저장 */
  }


  // 3.3) 일정 수정 (체크박스 체크하면 isDone 값 true 로 변경)
  // => todo 변경 (수정된 자료로)
  // => todo.map() 으로 id 가 일치하는 item 의 isDone 값 변경후(토글방식) return
  // => 수정대상인 id 를 인자로 전달받음
  const onUpdate = (targetId) => {
    setTodo(todo.map((it) => it.id === targetId ? { ...it, isDone: !it.isDone } : it));
  }


  // 3.4) 일정 삭제 
  // => todo 변경 (삭제 대상 제거)
  // => todo.filter() 로 id 가 일치하는 item 만 제외시키고 다른 item 들은 return
  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  }

  return (
    <div className='App'>
      <Header />

      {/* 3.2) 입력을 위한 일정추가 함수 전달 */}
      <TodoEditor onCreate={onCreate} />

      {/* 3.1) 배열을 리스트로 랜더링하기 */}
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;