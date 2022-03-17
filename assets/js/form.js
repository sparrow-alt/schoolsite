import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserSessionPersistence, signOut } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { setcookiehour, deleteCookie, getCookie } from "./functions.js";
const firebaseConfig = {
    apiKey: "AIzaSyBff6gLXbUMW0rnq4186O9d9896toadZ30",
    authDomain: "school-site-b799d.firebaseapp.com",
    projectId: "school-site-b799d",
    storageBucket: "school-site-b799d.appspot.com",
    messagingSenderId: "704109356346",
    appId: "1:704109356346:web:be6a9266093b06dbd81c03",
    measurementId: "G-VXQWNZJ3MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
document.getElementById("logIn").addEventListener("click", logIn);
document.getElementById("forgot").addEventListener("click", forgot);
document.getElementById("tos").addEventListener("click", tos);
const errmsg = document.getElementById("error")

function logIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = signInWithEmailAndPassword(auth, email.value, password.value);
    promise.catch(e => error(e.message));

    
}

function forgot() {
    document.getElementById("password").style.display = "none";
    document.getElementById("forgot").style.display = "none";
    document.querySelector("#logIn").innerHTML = "Reset Password";
    document.getElementById("logIn").addEventListener("click", reset);
}

function tos() {
    window.location.href = "./tos.html";
}
function reset() {
    let email = document.getElementById("email");
    const promise = sendPasswordResetEmail(auth, email.value);
    promise.catch(e => error(e.message, "reset"));
}
function error(errorMSG, context = "") {
    const msg = "Error: " + errorMSG.split("/")[1].split(")")[0];

    errmsg.innerHTML = msg;
}

window.onbeforeunload = function() {
    deleteCookie("user");
    signOut(auth)
}
auth.onAuthStateChanged(user =>{
    if(user){
        alert("Signed In " + user.email)
        errmsg.innerHTML = "";
        setcookiehour("user", user.email);
        localStorage.setItem("UserComplex", JSON.stringify(user));
        window.onbeforeunload = null;
        window.location.replace("/schoolsite/portal/dash.html");
    }
    else{
        alert("Signed Out")
    }
})
