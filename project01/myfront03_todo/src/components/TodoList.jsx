import './TodoList.css';
import TodoItem from "./TodoItem";

const TodoList = () => {

    return (
        <div className="TodoList">
            <h3>Todo List ✔</h3>
            <input className="searchBar" placeholder="검색어를 입력하세요"></input>
            <div className='list_wrapper'>
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </div>
        </div>
    );
}

export default TodoList;