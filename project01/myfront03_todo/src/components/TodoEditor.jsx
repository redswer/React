// => Context가 공급하는 Data 사용하기
//    - useContext(Context)
//      인자는 Data를 공급할 Context 이고, 
//      이 Context 가 제공하는 Data를 return 함.  

import { useRef, useState, useContext } from 'react';
import './TodoEditor.css';
import { TodoContext } from '../App';

// const TodoEditor = ({ onCreate }) => {
    // => Props 전달은 필요 없으므로 삭제
const TodoEditor = () => {

    // ** Context 적용
    // => import : useContext, TodoContext
    const { onCreate } = useContext(TodoContext);
    // => useContext(TodoContext) 정의

    const [content, setContent] = useState("");

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const inputRef = useRef();

    const onSubmit = (e) => {
        if (!content) {
            e.preventDefault();
            inputRef.current.focus();
            return;

        } else {
            onCreate(content);
        }
        setContent("");
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) { onSubmit() }
    }

    return (
        <div className="TodoEditor">
            <h3>새로운 Todo 작성하기 🖊</h3>
            <div className='editor_wrapper'>
                <input ref={inputRef}
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDown}
                    placeholder="새로운 일정 입력" />
                <button onClick={onSubmit}>추가</button>
            </div>
        </div >
    );
}

export default TodoEditor;