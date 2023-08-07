import { useEffect } from "react";

export default function Even() {
    // 언마운트 제어하기
    // useEffect 의 콜백함수에서 콜백함수를 return 하도록 작성
    useEffect(() => {
        return () => { console.log('** Even 컴포넌트 언마운트됨 **') }
        // => 클린업 함수
        //    - useEffect 의 콜백함수에서 return 하는 함수
        //    - 콜백함수(Even 컴포넌트)를 재호출(리렌더링)하기 전에 실행(호출)됨.
    });

    return <div>현재 count 값은 짝수입니다.</div>;
}