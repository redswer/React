import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import './App.css';


function App() {
  const name = 'GreenComputer';
  return (
    //  class 는 JS 예약어 이므로 className 으로 사용
    <div className="App">
      <Header />
      <Body name = {name}/>
      {/* body 에 name 값 전달 */}
      <Footer />
    </div>
  );
}

export default App;