const back = document.getElementById('back');

back.addEventListener('click', () => {
    window.location.href = '/main.html';
});

const blog = document.getElementById('blog');

blog.addEventListener('click', () => {
    const blogUrl = blog.getAttribute('data-blog-url');
    window.open(blogUrl, '_blank');
});


// URL에서 프로필 데이터 추출
// profileData는 json객체로 파싱, JSONProfileData 그대로 사용하면 적용이 안된다.
// 이미지 url은 그대로 사용 
const urlParams = new URLSearchParams(window.location.search);
const JSONProfileData = urlParams.get('profile');
const profileData = JSON.parse(JSONProfileData);
const profileImageUrl = urlParams.get('profileImage');

// 데이터 잘 들어왔는지 확인용 로그
console.log("이해1", JSONProfileData);
console.log("이해2", profileData);
console.log("이해3", profileImageUrl);

// 프로필 데이터들이 각각 어디에 표현되는지 CSS 선택자와 일치하는 첫 번째 요소를 경로로 잡아둠
const nameLabel = document.querySelector('.name');
const mbtiLabel = document.querySelector('.mbti');
const blogLabel = document.getElementById('blog');
const hobbyLabel = document.querySelector('.font1:nth-of-type(1)');
const introLabel = document.querySelector('.font1:nth-of-type(2)');
const profileImage = document.querySelector('.imgs');
const area1Element = document.querySelector('.area1');


// 프로필 이미지 배경 설정과 각 데이터들 text로 변환, 블로그 링크 속성 부여
area1Element.style.backgroundImage = `url('${profileImageUrl}')`;
nameLabel.textContent = profileData.name;
mbtiLabel.textContent = profileData.mbti;
blogLabel.textContent = profileData.blog;
blogLabel.setAttribute('data-blog-url', profileData.blog);
hobbyLabel.textContent = profileData.hobby;
introLabel.textContent = profileData.intro;
profileImage.src = profileImageUrl;

