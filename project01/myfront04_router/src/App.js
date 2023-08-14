import './App.css';
import Home from './pages/Home';
import Topics from './pages/Topics';
import Contact from './pages/Contact';
import { Routes, Route, Link, NavLink } from 'react-router-dom';

// ** Routing
// => 경로를 지정하는 과정
// ** Page Routing
// => 요청에 따라 적절한 페이지를 반환하는 과정
// => 이때 웹 페이지를 어디서 만드느냐에 따라 
//    SSR(Server Side Rendering), CSR(Client Side Rendering) 로 나뉘며,
//    리액트는 SPA(Single Page Application) 이며 CSR 방식을 채택하고 있다.
// => 두 방법 모두 장단점이 있으므로 서비스의 목적에 따라 적절한 방식을 채택한다.
// => CSR 은 처음접속시 Html 과 JS 에플리케이션을 함께 제공받기 때문에 처음접속은 느리지만,  
//    이후 페이지 이동은 브러우저에서 교체하므로 훨씬 빠르다.


// ** Router 적용하기
// => 마치 Page 가 이동하는것처럼 url 에 의해 
//    적당한 컴포넌트가 배치 되도록 해줌

// 1. 프로젝트 root 경로에 리액트 라우터 설치

// 2. Project 구성
// => src -> components, pages, images

// 3. 실습
// 3.1) BrowserRouter 컴포넌트

// 3.2) HashRouter 컴포넌트 

// 3.3) Nested Routing

function App() {
  return (
    <div className="App">
      <h2>** React Router Dom Test **</h2>
      {/* 1) 적용 전 */}
      {/*
      <Home />
      <Topics />
      <Contact />
      */}

      {/* 2.1) a_href : 페이지가 리로드 됨 */}
      {/*
      <ul>
        <li><a href='/'>Home</a></li><br />
        <li><a href='/topics'>Topics</a></li><br />
        <li><a href='/contact'>Contact</a></li><br />
      </ul>
      */}
      {/* 2.2) Link to : 페이지가 리로드되지 않음 */}
      <ul>
        <li><Link to='/'>Home</Link></li><br />
        <li><Link to='/topics'>Topics</Link></li><br />
        <li><Link to='/contact'>Contact</Link></li><br />
      </ul>

      {/* 2.3) NavLink_to*/}
      {/* 사용자가 어느 페이지에 위치하는지 알 수 있도록 해줌
          개발자도구 elements Tab 에서 확인해보면 class="active" 속성 추가되어있음 */}
      <ul>
        <li><NavLink to='/'>Home</NavLink></li><br />
        <li><NavLink to='/topics'>Topics</NavLink></li><br />
        <li><NavLink to='/contact'>Contact</NavLink></li><br />
      </ul>

      {/* Routes, Route 컴포넌트
          => Routes: Route 컴포넌트들을 감싸며 ( 6 이전버전의 Switch 가 변경됨)
          => Route : path, element_path에 해당하는 컴포넌트
          => Link_to : Page 가 리로드 되지않도록 해줌 (SPA 구현에 적합) */}

      <Routes>
        <Route path='/' element={<Home />} />

        {/* Nested Routing */}
        {/* <Route path='/topics' element={<Topics />} /> */}
        <Route path='/topics/*' element={<Topics />} />
        {/* => Topics 컴포넌트에서의 Route 를 위해 path의 topoics 뒤에 /* 를 붙여줌 */}

        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;