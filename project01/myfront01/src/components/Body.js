// ** JSX 컴포넌트 기본규칙
/*
=> 컴포넌트명은 대문자로 시작
=> 기본자료형, 산술식,..객체, 배열 등
=> 단, 객체, 배열명 직접사용은 불허
=> class 는 JS 예약어 이므로 className 으로 사용
=> 모든 Tag 는 닫힘 규칙 
=> 최상위 Tag 규칙 (필요시 <div> 또는 <React.Fragment> Tag 로 감싸줌)
=> 조건부 랜더링 : 삼항식, 조건문(JSX 에서는 사용불가능
** Css, 스타일 적용하기
=> 인라인 스타일링 : style={{스타일...}}
=> 스타일파일 분리 : Body.css , import './Body.css
 ** Props, 컴포넌트에 값 전달하기
 ** Event 
 ** State
 */


//  스타일 파일 분리 : Body.css , import './Body.css
/* 컴포넌트는 import MyComp({ }) from "module(real_File_path)"; 형식이지만,
    css 는 real_File_path 만 명시함 */
import './Body.css';

//  컴포넌트명은 대문자로 시작
function Body() {
    let n1 = 10,
        n2 = 20;

    let s1 = 'Hello',
        s2 = 'React & JSX';

    let b1 = true,
        b2 = false;

    let obj = {
        id: 'banana',
        name: '바나나'
    }

    if (b1) {
        return (
            // class 는 JS 예약어 이므로 className 으로 사용
            <body className='body'>
                {/* ** Css, 스타일 적용하기
                     => 인라인 스타일링 : style={{ 스타일...}} */}
                <h1 style={{ color: 'yellow', backgroundColor: 'green' }}>** Body : JSX Test **</h1>
                <p>산술식 : n1 + n2 = {n1 + n2}</p>
                <p>문자식 : s1 + s2 = {`${s1} ${s2}`}</p>
                <p>논리식 : or = {b1 || b2}, and = {b1 && b2}</p>
                {/* <p>{obj}</p> 는 오류
                    => {} 내에서 객체, 배열명 직접 사용은 불허 */}
                <p>Object : obj.id = {obj.id}, obj.name = {obj.name}</p>
                <p>삼항식으로 n1 + n2 의 값이 짝수이면 '짝수', 아니면 '홀수' 출력하기</p>
                <p>n1 + n2 = {(n1 + n2) % 2 == 0 ? '짝수' : '홀수'}</p>
                {/* 조건부 랜더링 : 삼항식 (조건문은 JSX 에서 사용 불가능) */}
            </body>
        );
    } else {
        return (
            <div>
                <h1>** Body : JSX Test **</h1>
                <p>if 조건문 test : false</p>

            </div>
        )
    };


};

export default Body;