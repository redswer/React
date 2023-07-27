import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import './App.css';


function App() {
  return (
    //  class 는 JS 예약어 이므로 className 으로 사용
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
