import { NavLink, Route, Routes } from "react-router-dom";

function Topics() {
    return (
        <div>
            <h2>Topics</h2>

            {/* ** Nested Routing */}
            {/* 1) 자식 page 1,2,3 추가 ( Topics01 ) 
                    => App.js의 라우트 path "/topics/*" 로 수정 */}
            <ul>
                <li><NavLink to='/topics/1'>Html</NavLink></li>
                <li><NavLink to='/topics/2'>Javascript</NavLink></li>
                <li><NavLink to='/topics/3'>React</NavLink></li>
            </ul>

            <Routes>
                <Route path="/1" element={'Html은 재미있다'} />
                <Route path="/2" element={'Javascript는 재미있다'} />
                <Route path="/3" element={'React는 재미있다'} />
            </Routes>
        </div>
    );
}

export default Topics;