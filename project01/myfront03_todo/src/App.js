
// ** 브라우저의 Data 임시 보관소
// => 브라우저는 사용자가 여러 페이지를 동시에 탐색하도록 복수의 페이지탭을 지원하며
//    페이지탭를 새로고침하면  이 페이지탭에서 보관하던 데이터를 삭제하고
//    페이지를 다시 불러온다.
// => React 앱의 State , 변수에 보관한 Data는 위의 브라우저 탭에 보관함.
//    그러므로 페이지탭을 종료하거나 새로고침 하면 모두 사라짐 

// ** 브라우저의 Data 저장소 (Html5 부터 제공)
// => Web Storage
//    -> Local Storage
//        .브라우져 종료시에도 유지
//        . window.localStorage 로 접근
//    -> Session Storage
//        . 페이지탭 단위로 보관하는 방식으로 페이지 종료시 삭제
//        . 단, 새로고침은 유지됨
//        . window.sessionStorage 로 접근
//    -> 용량 : 약 5~10 MB (브라우저별 기기별차이)
//    -> Data Type : JS 객체 형식과 동일하게 key, value 쌍으로 이루어짐 
// => IndexedDB
//  -> 색인이 포함된 JSON 객체가 모여있는 트랜잭셔널 로컬 데이터베이스
//  -> W3C가 권고한(2015년 1월 8일) 웹 브라우저 표준 인터페이스.
//  -> 웹사이트는 영속적인 데이터를 모아서 저장할 수 있다.
// => Cookies
//    -> 서버와 클라이언트간의 데이터 교환을 위한 용도 
//    -> 용량 : 기본 약 4KB

// ** Local Storage 메소드
// => localStorage.setItem(키, 값) : 로컬 스토리지에 저장 
// => localStorage.getItem(키) : 로컬 스토리지에서 해당 키의 값 조회
// => localStorage.removeItem(키) : 로컬 스토리지에 해당 키가 지워짐
// => localStorage.clear( ) : 로컬 스토리지 전체가 비워짐
// => 단, 키 와 값 모두 반드시 문자열
//    그러므로 값이 참조형객체이면 문자열로 변환 
// => 객체->문자열: JSON.stringify(value) 
//    문자열->객체: JSON.parse(문자열) 

// ** Session Storage 메소드
// => sessionStorage.setItem(키, 값) :  스토리지에 저장
// => sessionStorage.getItem(키) :  스토리지에서 해당 키의 값 조회
// => sessionStorage.removeItem(키) : 스토리지에 해당 키가 지워짐
// => sessionStorage.clear() : 스토리지 전체가 비워짐

// ** 개발자모드에서 Local Storage Test
// => Storage확인: 앱실행 -> 개발자모드 -> Application Tab
// => Data 입력: 개발자모드 -> Console 에서 입력
//    -> insert :  localStorage.setItem('key1', 'data1')
//    -> delete :  sessionStorage.removeItem('key1')
//    -> Data 몇개 입력 후 브라우져 종료후에도 유지됨 확인해본다 

// ** TodoList (일정관리 앱) 리팩토링 5.
// => Local Storage 적용하기
//  1) Data_Loading : useEffect 사용
//  2) Create, Update, Delete 처리

//=================================================

import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import React, { useMemo, useCallback, useReducer, useRef, useEffect, useState } from "react";

// ** Mock Data
const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    createDate: new Date().getTime()
  },
  {
    id: 1,
    isDone: true,
    content: 'JavaScript 공부하기',
    createDate: new Date().getTime()
  },
  {
    id: 2,
    isDone: false,
    content: 'Java 공부하기',
    createDate: new Date().getTime()
  },
  {
    id: 3,
    isDone: false,
    content: 'MySQL 예습하기',
    createDate: new Date().getTime()
  },
  {
    id: 4,
    isDone: false,
    content: 'Spring 예습하기',
    createDate: new Date().getTime()
  }
]
// ** Local Storage 적용하기
// => 입력, 수정, 삭제 된 state(배열 Data) 를 newState 에 담아 
//    localStorage에 저장후 return
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.dataList;
    }
    case "Create": {
      const newState = [action.newItem, ...state];
      localStorage.setItem("todo", JSON.stringify(newState));
      return newState;
    }
    case "Update": {
      const newState = state.map((it) =>
        it.id === action.targetId ?
          { ...it, isDone: !it.isDone } : it);
      localStorage.setItem("todo", JSON.stringify(newState));
      return newState;
    }
    case "Delete": {
      const newState = state.filter((it) =>
        it.id !== action.targetId);
      localStorage.setItem("todo", JSON.stringify(newState));
      return newState;
    }
    default: return state;
  }; //switch
} //reducer

// ** Context 적용 2단계
// 1) Context 생성
// => 불필요한 랜더링을 방지하여 최적화 하기위해 
//    Context 를 역할별로 분리한다.
export const TodoStateContext = React.createContext();
// => todo 의 변경에 영향받는 컴포넌트를 위한 Context 
export const TodoDispatchContext = React.createContext();
// => dispath 함수 onCreate, onUpdate, onDelete 의 변경에
//    영향받는 컴포넌트를 위한 Context

function App() {

  // ** Local Storage 적용 1
  // => LocalStorage 의 Data 읽어, todo 초기화 하기  
  const [todo, dispatch] = useReducer(reducer, []);
  // => todo 초기값은 빈배열로
  const idRef = useRef(0);
  // => localData Loading 전이므로 배열크기를 알수없어 0 으로 초기화
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // =>  DataLoading 확인을 위한 State_변수

  // ** localData Loading
  // => Mount시 1회 실행 하도록 useEffect 에 빈 배열 전달
  useEffect(() => {
    const rawData = localStorage.getItem("todo");
    // => LocalStorage 의 Data 존재 확인
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    // => localData 가 존재하면
    //  -> create시 id값 생성을 위한 idRef 값 할당
    //  -> Loading 된 Data를 State 변수 todo에 담기위해 dispatch 호출
    //  -> setIsDataLoaded(true) : Loading 완료됨 표시 
    idRef.current = localData.length;
    dispatch({ type: "INIT", dataList: localData });
    setIsDataLoaded(true);

    // => Loading 결과 확인
    console.log("** localData1 =>" + localData);
    console.log("** localData2 =>" + typeof (localData)); // 배열도 객체임
  }, []);
  // ------------------------------------------------
  // ** 일정추가 (Create) 함수 생성
  const onCreate = (content) => {
    dispatch({
      type: "Create",
      newItem: {
        id: idRef.current,
        content: content,
        isDone: false,
        createDate: new Date().getTime()
      }
    }); //dispatch
    idRef.current += 1;
  }; //onCreate ( useCallback 을 적용하지않음 )

  // ** 일정 수정
  const onUpdate = useCallback((targetId) => {
    dispatch({ type: "Update", targetId }); //dispatch   
  }, []);

  // ** 일정 삭제 
  const onDelete = useCallback((targetId) => {
    dispatch({ type: "Delete", targetId }); //dispatch 
  }, []);

  // ------------------------------------------------
  // ** TodoDispatchContext.Provider value 속성값
  //    onCreate, onUpdate, onDelete 함수 최적화
  // => 처음 한번만 (TodoList가 처음 리랜더링 될때) 실행되도록 메모이제이션 
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);
  // ------------------------------------------------
  console.log("** App Update !! **");
  return (
    <div className="App">
      <Header />
      {/* 
      ** Context 적용 2단계
      2) Context 분리 후 Provider 배치 
        => 계층적으로 배치
        => 이 경우 하위 Provider 값이 우선적용됨.
        => 용도별로 Context를 분리했다고 최적화가 적용되지는 않음
           TodoDispatchContext.Provider value 속성값 onCreate, onUpdate, onDelete 함수는
           위에 useCallback 함수로 최적화된 onUpdate, onDelete 가 아니고
           전달시점에 생성하여 보내기 때문에 별도로 메모이제이션을 적용해 주어야 최적화할 수 있다. 
      */}
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          {/* <TodoDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>  
            => cONTEXT 분리 했어도 최적화 적용 되지 않음  */}
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
