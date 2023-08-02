// ** 1컴포넌트 1화일
// => 그러므로  export default 많이 사용됨.

// ** Props, 컴포넌트에 값 전달하기
// => Props(Properties)객체 : 부모에서 자식으로 값 전달
// => 그러므로 Body 컴포넌트에 Props 로 값을 전달하기위해서는
//    App 컴포넌트에서 전달해야함. ( name 값을 Body 로 전달)
export default function Header(props) {
  return (
    <header>
      <h1>** Header **</h1>
      <p>금주의 Best_Dress : color={props.bestDress.color}, style={props.bestDress.style}, price={props.bestDress.price}</p>
      {/* <p>비교 : Best_Dress = {props.bestDress}</p> =>  오류 */}
    </header>
  );
};