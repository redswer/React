// ** Context 적용
// => immport: useContext, TodoContext 
// => useContext() 로 Data 전달받음
//    TodoItem 컴포넌트 인자로 전달받은 Props Data 중
//    Context 로 전달받는 Data는 필요 없으므로 삭제  

import './TodoItem.css';
import React, { useContext } from 'react';
import { TodoContext } from '../App';

// ** Context 적용
// => 번호가 일치하는 주석 해제 후 확인

// 1.
// const TodoItem = ({ id, isDone, content, createDate, onUpdate, onDelete }) => {
// 2.
// const TodoItem = () => {
// 3.
const TodoItem = ({ id, isDone, content, createDate }) => {

    // 1.
    // const {} = useContext(TodoContext);
    // 2.
    // const { id, isDone, content, createDate, onUpdate, onDelete } = useContext(TodoContext);
    // 3. 
    const { onUpdate, onDelete } = useContext(TodoContext);
    // => 적용후 최적화 기능 점검
    //    React.memo 이 작동하지 않음을 확인
    //    이유는 todo 와 함수들이 하나의 Context 로 묶여있기 때문에
    //    관련이 없는 컴포넌트에서도 부모가 랜더링 되면 같이 랜더링된다.
    //    그러므로 Context 는 역할별로 분리하는것이 바람직하다.

    const onChangeCheckbox = () => { onUpdate(id) }
    // const onClickButton = () => { onDelete(id) }

    // 최적화 (React.memo 적용) 전/후 비교
    console.log('TodoItem Update id=' + id);

    return (
        <div className="TodoItem">
            <div>
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={onChangeCheckbox} />
            </div>
            <div className="title_col">{content}</div>
            <div className='date_col'>{new Date(createDate).toLocaleDateString()}</div>
            <div className='btn_col'>
                {/* <button onClick={onClickButton}>삭제</button> */}
                <button onClick={() => { onDelete(id) }}>삭제</button>
            </div>
        </div>
    );
}

export default React.memo(TodoItem);