import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import './App.css';

// 2. Mock Data 만들기 => Mock Data: 모조 Data (개발중 테스트 목적으로 사용하는 Data)
/*
할 일 (item)을 담을 배열 생성
앞으로 데이터를 저장하고 관리할 배열, Data_Table 역할

구조 = id : 아이템 식별을 위한 고유키
      isDone: 할일 완료 여부 ( boolean )
      content: 해야 할 일정

      createDate: 일정 생성(등록) 시간
        => new Date().getTime()
            Date 값을 getTime 메서드를 이용해 타임스템프 값으로 변환
            이렇게 하면 보관데이터 용량이 줄어듬

// ** Date 주요 메서드
// => toDateString() :  날짜를 문자열로
// => toLocaleDateString() : 지역별 맞는 포맷으로

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
  content: 'MySQL 공부하기',
  createDate: new Date().getTime()
},
{
  id: 4,
  isDone: false,
  content: 'Spring 공부하기',
  createDate: new Date().getTime()
}];

// 3. 기능구현

function App() {

  return (
    <div className='App'>
      <Header />
      <TodoEditor />
      <TodoList />
    </div>
  );
}

export default App;