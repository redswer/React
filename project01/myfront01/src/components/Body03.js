import { useState } from 'react';
import './Body.css';

function Body() {
    // ** state Test 1 : input 태그 개별적으로 관리
    /* 
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [info, setInfo] = useState('');

    const onChangeName = (e) => { setName(e.target.value) }
    const onChangeGender = (e) => { setGender(e.target.value) }
    const onChangeBirth = (e) => { setBirth(e.target.value) }
    const onChangeInfo = (e) => { setInfo(e.target.value) }

    // ** 컴포넌트의 Update 확인
    console.log('** 컴포넌트의 Update');
    return (
        <div className='body'>
            <h2>** Body State Test 1 : 개별적으로 관리 **</h2>

            <div>
                <input value={name} onChange={onChangeName} placeholder='이름' />
            </div>
            <div>
                <select value={gender} onChange={onChangeGender}>
                    <option>''</option>
                    <option>남성</option>
                    <option>여성</option>
                </select>
            </div>
            <div>
                <input type='date' value={birth} onChange={onChangeBirth} />
            </div>
            <div>
                <textarea value={info} onChange={onChangeInfo} />
            </div>
        </div>
    );
 */


    // ** state Test 2 : input 태그를 객체화해서 하나의 state 로 관리 => 간결하고 효율적인 코드

    // State 객체 생성
    const [state, setState] = useState({
        name: '',
        gender: '',
        birth: '',
        info: ''
    });

    const onChangeState = (e) => {
        console.log('수정대상 : ' + e.target.name);
        console.log('수정된 값 : ' + e.target.value);
        
        // setState 에 새로운 객체 전달
        setState({
            ...state,
            // 스프레드로 기존 객체 state 값 나열
            [e.target.name]: e.target.value
            // 객체 괄호 표기법으로 name 속성을 key 로 e.target.value 를 value 로 저장
            // (객체 괄호 표기법 : 속성명을 괄호('[]')로 감싸서 표현)
        });
    }

    // ** 컴포넌트의 Update 확인
    console.log('** 컴포넌트의 Update');
    return (
        <div className='body'>
            <h2>** Body State Test **</h2>

            <div>
                <input name='name' value={state.name} onChange={onChangeState} placeholder='이름' />
            </div>
            <div>
                <select name='gender' value={state.gender} onChange={onChangeState}>
                    <option>''</option>
                    <option>남성</option>
                    <option>여성</option>
                </select>
            </div>
            <div>
                <input name='birth' type='date' value={state.birth} onChange={onChangeState} />
            </div>
            <div>
                <textarea name='info' value={state.info} onChange={onChangeState} />
            </div>
        </div>
    );
}
export default Body;