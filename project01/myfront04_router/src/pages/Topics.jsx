import { NavLink, Route, Routes, useParams } from "react-router-dom";

// ** Nested Routing
// 1) 자식 page 1,2,3 추가 ( Topics01 ) 
// => App.js의 라우트 path "/topics/*" 로 수정

// 2) 배열로 목록 정의 ( Topics )

// 3) Topic 컴포넌트 추가

// ** useParams()
// => 현재 URL에 포함되어 있는 key, value 형식의 객체를 반환
//   예) path /test/3 으로 이동한 경우 params의 값 {id:'3'}을 확인할 수 있고
//      path /test/something 으로 이동한 경우 params의 값 {id:'something'} 확인가능
// => "/user/:id" 라는 라우트가 있다면 useParams 로 :id 파라미터를 가져올 수 있음

// 2) 배열로 목록 정의
const contents = [
    { id: 1, title: 'HTML', description: 'HTML 은 재미있다...' },
    { id: 2, title: 'JavaScript', description: 'JavaScript 는 더 재미있다...' },
    { id: 3, title: 'React', description: 'React 는 흥미롭다...' }
]

// 3) Topic 컴포넌트 추가
// => 배열 contents 에서 전달된 id 에 해당하는 Data 의 description(서술/기술/묘사/표현) 출력하기
// => filter 적용 id 가 일치하는 경우에만 true
function Topic() {
    // const {params} = useParams();
    // console.log(`** params =  + ${params}, params.topic_id = ${params.topic_id}`);
    const { topic_id } = useParams();

    // 3.2) filter 적용
    let selected_item = {
        title: 'sorry',
        description: '~ Not Found ~'
    }

    const find_item = contents.filter((content) => content.id == topic_id);

    selected_item = find_item.length > 0 ? find_item[0] : selected_item;

    return (
        <div>
            {/* 3.1) */}
            {/* <h3>** Topic **</h3>
            Topic... */}

            <h3>** {selected_item.title} **</h3>
            <h3>{selected_item.description}</h3>
        </div>
    );
}

// function Topics() {
//     return (
//         <div>
//             <h2>Topics</h2>

//             {/* ** Nested Routing */}
//             {/* 1) 자식 page 1,2,3 추가 ( Topics01 ) 
//                     => App.js의 라우트 path "/topics/*" 로 수정 */}
//             <ul>
//                 <li><NavLink to='/topics/1'>Html</NavLink></li>
//                 <li><NavLink to='/topics/2'>Javascript</NavLink></li>
//                 <li><NavLink to='/topics/3'>React</NavLink></li>
//             </ul>

//             <Routes>
//                 <Route path="/1" element={'Html은 재미있다'} />
//                 <Route path="/2" element={'Javascript는 재미있다'} />
//                 <Route path="/3" element={'React는 재미있다'} />
//             </Routes>
//         </div>
//     );
// }

// ver.2
function Topics() {
    const lies = contents.map((content) => {
        return (<li key={content.id}><NavLink to={'/topics/' + content.id}>{content.title}</NavLink></li>);
    });

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                {lies}
            </ul>
            <div>
                <Routes>
                    <Route path="/:topic_id" element={<Topic />} />
                    {/* => Route 도 1개로 공유, 출력할 element 는 Topic 컴포넌트로
                            요청에 따른 출력내용은 Topic 컴포넌트에서 판단
                        => 따라서 주소창에서 전달되는 url 을 변수로 전달받아야 함
                        => 이것을 파라미터라고 하고, 구분하기 위해 앞쪽에 콜론(:)을 붙여줌
                        => topic_id 위치의 값이 Topic 컴포넌트에 인자로 전달됨 */}
                </Routes>
            </div>
        </div>
    );
}

export default Topics;