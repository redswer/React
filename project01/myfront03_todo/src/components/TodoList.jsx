import './TodoList.css';
import TodoItem from "./TodoItem";
import { useMemo, useState } from 'react';

const TodoList = ({ todo, onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => { setSearch(e.target.value) }
    const getSearchResult = () => {
        return search === "" ? todo
            : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    }

    // ** 분석 기능 추가
    // 1) 분석 함수 추가
    // => 배열 todo 의 아이템 총갯수, 완료갯수, 미완료갯수 를 객체에 담아 return
    /* 
        const analyzeTodo = () => {
            console.log('** analyzeTodo 호출됨 **');
    
            // todo 배열의 아이템의 총 갯수
            const totalCount = todo.length;
            // todo 배열의 완료 아이템 갯수
            const doneCount = todo.filter((it) => it.isDone).length;
            // => 배열 todo 의 isDone 의 값이 true 인 item 의 갯수
            // filter() 도 결과값을 배열로 리턴하므로 length 로 갯수 확인 가능
            // todo 배열의 미완료 아이템 갯수
            const notDoneCount = totalCount - doneCount;
            return { totalCount, doneCount, notDoneCount }
        }
     */


    // 2) 분석 함수 호출
    /*
    const totalCount = analyzeTodo().totalCount;
    const doneCount = analyzeTodo().doneCount;
    const notDoneCount = analyzeTodo().notDoneCount;
    */
    // => console.log 를 확인하면 6번 호출됨

    /*
    const { totalCount, doneCount, notDoneCount } = analyzeTodo();
    */
    // => analyzeTodo 값을 호출하고 return 값을 구조분해 할당
    // => console.log() 확인하면 2번 호출됨


    // 3) 분석 결과
    // => analyzeTodo() 는 todo 에 저장 아이템이 많아질수록
    //    연산량이 많이지며, 성능에 영향을 줄수있음
    // => 불필요한 호출이 있는지 확인 위해 analyzeTodo() 에 콘솔 메시지 추가
    //   ( 마운트시 1 + 검색어 단어 입력시마다 호출됨 을 확인 )
    // => 재연산이 필요없는 경우에도 호출됨을 알 수 있다.
    //   ( 컴포넌트 내부의 함수는 리랜더링 할때 마다 호출되기 때문 )  
    // => 해결 위해 useMemo() 적용.


    // 4) useMemo() 적용 최적화
    // => const value = useMemo(callback, [의존성배열]);
    //    의존성배열 의 값이 바뀌면 callback 함수를 실행하고 결과값 return 
    /* const { totalCount, doneCount, notDoneCount } = useMemo(analyzeTodo, [todo]); */
    // => todo 도 배열이지만 useMemo() 에서는 배열 안에 todo 를 넣어야 함
    // => todo 배열의 값에 변경사항이 있을 때에만 analyzeTodo 함수 호출됨


    // 5) 위의 내용을 축약
    const analyzeTodo = useMemo(() => {
        console.log('** analyzeTodo 호출됨 **');

        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return { totalCount, doneCount, notDoneCount }
    }, [todo]);

    const { totalCount, doneCount, notDoneCount } = analyzeTodo;

    /* 기본적으로 컴포넌트 내부의 함수는 리랜더링 할때 마다 호출되지만, 위의 최적화를 통해
        todo 배열의 값에 변경사항이 있는 경우에만 호출되도록 함
        => TodoList 검색 시에는 todo 배열 변경사항 없으므로 호출되지 않음(console 출력 x) */

    return (
        <div className="TodoList">
            <h3>Todo List ✔</h3>
            <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                <div>* 총일정 갯수 : {totalCount}</div>
                <div>* 완료된 일정 : {doneCount}</div>
                <div>* 미완료 일정 : {notDoneCount}</div>
            </div>

            <input className="searchBar"
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요"></input>
            <div className='list_wrapper'>
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}

export default TodoList;