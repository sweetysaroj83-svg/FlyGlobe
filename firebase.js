import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyDw9-MPeUolnxUUa_0OEwbsCMiQRTqY25I",

  authDomain:
  "flyglobe-35e3b.firebaseapp.com",

  projectId:
  "flyglobe-35e3b",

  storageBucket:
  "flyglobe-35e3b.firebasestorage.app",

  messagingSenderId:
  "951396748120",

  appId:
  "1:951396748120:web:ce739b595417e4b2dfb32d",

  measurementId:
  "G-GHFSK779VN"
};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

// SIGNUP
window.signup = async function(){

    const email =
    document.getElementById("signupEmail").value;

    const password =
    document.getElementById("signupPassword").value;

    try{

        await createUserWithEmailAndPassword(
        auth,
        email,
        password
        );

        alert("Signup Successful ✅");

        window.location.href =
        "index.html";

    }catch(error){

        alert(error.message);
    }
}

// LOGIN
window.login = async function(){

    const email =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    try{

        await signInWithEmailAndPassword(
        auth,
        email,
        password
        );

        alert("Login Successful ✅");

        window.location.href =
        "preferences.html";

    }catch(error){

        alert(error.message);
    }
}