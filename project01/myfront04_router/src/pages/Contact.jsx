// ** 관련 훅(HOOKs) 과 추가사항
// => useParams(), path 에 :id 사용
// => useSearchParams()
//    url 에 있는 쿼리 스트링의 값을 꺼내어 사용할 수 있도록 해줌.
//    쿼리스트링 => ex. Login?id=banana&password=12345!
// => useLocation()
//    현재 라우터의 위치를 나타내는 location 객체를 return
//    현재 위치에 관한 정보가 필요할떄 이용됨.
// => location 객체의 속성 : pathname, search(쿼리문자열) 등
// ** useSearchParams 와 useLocation
// => useSearchParams()
//    url 에 있는 쿼리 스트링의 값을 꺼내어 사용할 수 있도록 해줌.
// => useLocation()
//    현재 라우터의 위치를 나타내는 location 객체를 return
//    현재 위치에 관한 정보가 필요할떄 이용됨.
// => location 객체의 속성 : pathname, search(쿼리문자열) 등
//

import { useState } from "react";
import emotion1 from "../img/emotion1.png";
import emotion2 from "../img/emotion2.png";
import emotion3 from "../img/emotion3.png";
import emotion4 from "../img/emotion4.png";
import emotion5 from "../img/emotion5.png";
import { useSearchParams, useLocation } from "react-router-dom";

// => id 로 해당하는 image 파일명 return
const getEmotionImgById = (emotionId) => {
    const targetEmotionId = String(emotionId);
    switch (targetEmotionId) {
        case "1":
            return emotion1;
        case "2":
            return emotion2;
        case "3":
            return emotion3;
        case "4":
            return emotion4;
        case "5":
            return emotion5;
        default:
            return null;
    }
};

// => emotion Data List
const emotionList = [
    {
        id: 1,
        name: "완전 좋음",
        img: getEmotionImgById(1),
    },
    {
        id: 2,
        name: "좋음",
        img: getEmotionImgById(2),
    },
    {
        id: 3,
        name: "그럭저럭",
        img: getEmotionImgById(3),
    },
    {
        id: 4,
        name: "나쁨",
        img: getEmotionImgById(4),
    },
    {
        id: 5,
        name: "끔찍함",
        img: getEmotionImgById(5),
    },
];

function SelectEmotion() {
    // ** useSearchParams
    const [searchParam, setSearchParam] = useSearchParams();
    // => useState 처럼 배열형태로 반환
    // => 첫번째 요소: 조회, 수정가능한 메서드를 포함하고있는 쿼리스트링 객체
    // => 두번째 요소: 이 객체를 업데이트하는 함수 (즉, 새로운 쿼리스트링을 설정할수있음)  

    const queryId = searchParam.get("id");
    console.log(`** queryId=${queryId}, name=${searchParam.get("name")}`);

    // 새로운 url 입력 시 리랜더링을 위해 state 변수 추가하고, 새롭게 전달되는 queryId 로 초기화
    const [stateId, setStateId] = useState(queryId);

    //  ** useLocation
    const location = useLocation();
    console.log(`** location = ${location}`);
    console.log(`** location.pathname = ${location.pathname}`);
    console.log(`** location.search = ${location.search}`);

    // => filter 적용
    let selected_item = {
        name: 'Sorry_NotFound',
        img: getEmotionImgById(5)
    }

    const find_item = emotionList.filter((emotion) => queryId == emotion.id);
    selected_item = find_item.length > 0 ? find_item[0] : selected_item;

    return (
        <div>
            <h3>** {selected_item.name} **</h3>
            <img alt="감정5" src={selected_item.img} />
        </div>
    );
};

export default function Contact() {
    return (
        <div>
            <h2>Contact, EmotionList</h2>
            <img alt="감정1" src={getEmotionImgById(1)} />
            <img alt="감정2" src={getEmotionImgById(2)} />
            <img alt="감정3" src={getEmotionImgById(3)} />
            <img alt="감정4" src={getEmotionImgById(4)} />
            <img alt="감정5" src={getEmotionImgById(5)} />
            <p>당신의 기분을 주소창에 쿼리스트링으로 입력해보세요...</p>
            <p>쿼리스트링 : ex. Login?id=banana&password=12345!</p>
            <SelectEmotion />
        </div>
    );
}