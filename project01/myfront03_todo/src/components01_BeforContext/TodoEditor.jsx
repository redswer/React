// 3.2) 입력 (create)
// new 일정(content)을 담을 state 생성
// new 일정 처리할 onChangeContent 이벤트 핸들러 작성
// input 엘리먼트 속성 지정

import { useRef, useState } from 'react';
import './TodoEditor.css';

// new 일정을 onCreate(content) 함수를 이용해 부모의 state 변수인 배열 todo 에 저장
const TodoEditor = ({ onCreate }) => {

    const [content, setContent] = useState("");
    // => new 일정 처리할 onChangeContent 이벤트 핸들러

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const inputRef = useRef();
    const onSubmit = (e) => {

        // ** 기능 업그레이드 1 **
        // 입력값 무결성 확인
        // = content 값이 비어있으면 input 에 focus 가 머물게 하여 빈 Data 입력 방지
        if (!content) {
            e.preventDefault();
            inputRef.current.focus();
            return;
        } else {
            onCreate(content);
            // => 부모 (App)으로부터 전달받은 함수
        }
        setContent("");
    }

    // ** 기능 업그레이드 2 **
    // input 에서 일정 입력 후 엔터 키 눌렀을 때에도 submit 이 가능하도록 함
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