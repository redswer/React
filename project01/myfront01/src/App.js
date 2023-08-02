import MyHeader from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import './App.css';
// ** import
// => 컴포넌트는 MyComp from real_File_path; 
//    내부 코드에서 MyComp 이름으로 인식
// => css 는 real_File_path 만 명시함

function App() {
  const name='GreenComputer'
  // => 객체를 정의하고 Header 컴포넌트로 전달하고 
  //    Header 컴포넌트 에서 출력하기 
  const bestDress={
    color:'Red',
    style: 'long',
    price: 99000
  }
  return (
    <div className="App">
      <MyHeader bestDress={bestDress} />
      <Body name={name} country={'경기도 성남시'}/>
      <Footer />
    </div>
  );
}

export default App;