// ** Context 적용
// => immport: useContext, TodoContext 
// => useContext() 로 Data 전달받음

import './TodoList.css';
import TodoItem from "./TodoItem";
import { useMemo, useState, useContext } from 'react';
import { TodoContext } from '../App';

// const TodoList = ({ todo, onUpdate, onDelete }) => { 
const TodoList = () => {
    const { todo } = useContext(TodoContext);
    // => 구조분해 적용
    //    onUpdate, onDelete 는 TodoItem 으로 전달하기 위해 필요했지만,
    //    이제는 필요없으므로 todo 만 정의함

    // ** 검색기능
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => { setSearch(e.target.value) }
    const getSearchResult = () => {
        return search === "" ? todo
            : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    }

    // ** 분석기능
    const analyzeTodo = useMemo(() => {
        console.log('** analyzeTodo 호출됨 **');
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return { totalCount, doneCount, notDoneCount }
    }, [todo]);

    // 분석함수 호출
    // => useMemo
    const { totalCount, doneCount, notDoneCount } = analyzeTodo;

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
                placeholder="검색어를 입력하세요">
            </input>

            <div className='list_wrapper'>

                {/* ** 검색기능 : 배열(todo) 에  filter() 적용 */}
                {getSearchResult().map((it) => (

                    /* ** TodoItem Context 적용 */
                    
                    // <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
                    <TodoItem key={it.id} {...it} />
                    /* => Context에서 직접 전달받는 Props는 필요 없으므로 삭제한다.
                그러나 해당하는 Item 은 Props 로 전달해야하므로 그냥둔다. */
                ))}
            </div>
        </div>
    );
}

export default TodoList;