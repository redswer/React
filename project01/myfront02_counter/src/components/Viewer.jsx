/* function Viewer(props) {
    return (
        <div>
            <h2>현재 값은</h2>
            <h2>{props.count}</h2>
        </div>
    )
} */

// 객체 구조분해 적용
const Viewer = ({ count }) => {
    console.log('Viewer update');

    return (
        <div>
            <h2>현재 값은</h2>
            <h2>{count}</h2>
        </div>
    );
}

export default Viewer;