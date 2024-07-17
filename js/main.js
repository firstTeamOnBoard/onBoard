import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8EwYQfdefhmdQNxUZuDmg6si9UiCdiB0",
    authDomain: "onboard-4a35e.firebaseapp.com",
    projectId: "onboard-4a35e",
    storageBucket: "onboard-4a35e.appspot.com",
    messagingSenderId: "392725443429",
    appId: "1:392725443429:web:51c14b117aa4068cff278c"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    // db에 저장된 데이터들을 표현할 공간으로 cardArea 선택 
    const cardArea = document.querySelector('.cardArea');

    try {
        // getDocs를 이용하여 db에 profiles라는 항목에 저장되어 있는 데이터들을 가져온다.
        const data = await getDocs(collection(db, "profiles"));
        data.forEach((doc) => {
            // 각 프로필 데이터들을 profile이라는 변수에 저장한다.  
            const profile = doc.data();
            console.log("Profile data:", profile);   // 데이터 확인용
            console.log("이미지", profile.profileImage); // 데이터 확인용

            // 새로운 div 요소를 생성하고 css에서 ImageCard요소를 적용한다.
            const card = document.createElement('div');
            card.className = 'ImageCard';

            // img 요소를 생성하고 img데이터를 적용한다. .ImageCard img 라고 css파일에 적어두어서 자동으로 적용이 된다.
            const img = document.createElement('img');
            img.src = profile.profileImage;
            img.alt = profile.name;

            // img 요소를 card 요소에 추가하고, card 요소를 cardArea에 추가한다. 이로써 여러 프로필 카드들이 생성된다.
            card.appendChild(img);
            cardArea.appendChild(card);

            // 카드에 클릭 이벤트 추가
            card.addEventListener('click', () => {
                // 프로필 정보를 객체로 만들어서 URL에 포함시켜 info.html에 전송
                const profileData = {
                    blog: profile.blog,
                    hobby: profile.hobby,
                    intro: profile.intro,
                    mbti: profile.mbti,
                    name: profile.name,
                };
                const JSONProfileData = JSON.stringify(profileData);
                const profileImageUrl = profile.profileImage;
                // 데이터들을 url파싱을 통해서 보내기 위해선 JSON.stringify이 필요함. (json 문자열 변환)
                // 이미지 경로 링크가 JSON.stringify 이 작업 진행 시 모든 profileData값이 안넘어가짐
                // 이미지 경로만 따로 빼서 보내는 형식으로 해결
                // 이미지를 인코딩 하지 않고 보낼 시 url파싱부분에서 특수문자를 바꿔버려 이미지 경로에 대한 접근이 불가능해짐
                window.location.href = `/info.html?profile=${JSONProfileData}&profileImage=${encodeURIComponent(profileImageUrl)}`;
            });
        });
    } catch (error) {
        console.error("Error getting profiles: ", error);
    }
});

const logoImage = document.getElementById('logoImage');
logoImage.addEventListener('click', () => {
    window.location.href = '/team.html';
});

const button1 = document.getElementById('button1');
button1.addEventListener('click', () => {
    window.location.href = '/register.html';
});
