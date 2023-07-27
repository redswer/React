import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import './App.css';

function App() {
  const name = 'GreenComputer';

  // 객체 정의 후 header 컴포넌트로 전달 후 출력
  const info = {
    name: '안진혁',
    age: '27',
    country: '대한민국 경기도 광주시'
  }

  return (
    //  class 는 JS 예약어 이므로 className 으로 사용
    <div className="App">
      <Header head={info} />
      <Body names={name} country={'경기도 성남시'} />
      {/* body 에 names 값 전달 */}
      <Footer />
    </div>
  );
}

export default App;