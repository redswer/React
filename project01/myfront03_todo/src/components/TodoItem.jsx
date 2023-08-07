import './TodoItem.css';

const TodoItem = () => {
    return (
        <div className="TodoItem">
            <div><input type="checkbox"></input></div>
            <div className="title_col">해야할 일(일정)</div>
            <div className='date_col'>{new Date().toLocaleDateString()}</div>
            <div className='btn_col'><button>삭제</button></div>
        </div>
    );
}

export default TodoItem;