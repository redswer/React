import './TodoItem.css';
import React from 'react';

const TodoItem = ({ id, isDone, content, createDate, onUpdate, onDelete }) => {
    const onChangeCheckbox = () => {
        onUpdate(id);
    }

    const onClickButton = () => {
        onDelete(id);
    }

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
            {/* => 타임스템프 형식을 Date 형식으로 변환하고 toLocaleDateString() 을
            적용하여 문자열로 랜더링 */}
            <div className='btn_col'><button onClick={onClickButton}>삭제</button></div>
        </div>
    );
}

export default React.memo(TodoItem);