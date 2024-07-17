const noButton = document.getElementById('noButton');

noButton.addEventListener('click', () => {
    window.location.href = '/main.html';
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8EwYQfdefhmdQNxUZuDmg6si9UiCdiB0",
    authDomain: "onboard-4a35e.firebaseapp.com",
    projectId: "onboard-4a35e",
    storageBucket: "onboard-4a35e.appspot.com",
    messagingSenderId: "392725443429",
    appId: "1:392725443429:web:51c14b117aa4068cff278c",
    measurementId: "G-0NFWX91DD1"  // 
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');  //이름
    const mbtiInput = document.getElementById('mbtiInput');  //mbti
    const hobbyInput = document.getElementById('hobbyInput');  // 취미
    const introInput = document.getElementById('introInput');  // 자기소개 
    const blogInput = document.getElementById('blogInput');  // 블로그 링크 
    const profileInput = document.getElementById('profileInput');  // 프로필 이미지
    const saveButton = document.getElementById('okButton');  //저장 버튼

    saveButton.addEventListener('click', async () => {
        const profileData = {
            name: nameInput.value,
            mbti: mbtiInput.value,
            hobby: hobbyInput.value,
            intro: introInput.value,
            blog: blogInput.value,
        };

        try {
            // 프로필 이미지가 있는 경우
            if (profileInput.files[0]) {
                const profileImage = profileInput.files[0];
                const storageRef = ref(storage, `profiles/${profileImage.name}`);
                await uploadBytes(storageRef, profileImage);
                const downloadURL = await getDownloadURL(storageRef);
                profileData.profileImage = downloadURL;
            } else {
                profileData.profileImage = null;
            }

            const docRef = await addDoc(collection(db, "profiles"), profileData);
            alert('저장되었습니다.');
            console.log("Profile data saved successfully!");
            window.location.href = "main.html";  // 저장 후 main.html로 이동
        } catch (error) {
            console.error("Error saving profile data:", error);
        }
    });
});
