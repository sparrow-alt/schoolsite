import { getCookie, deleteCookie, readUserData, makeElement } from './functions.js';
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

const user = getCookie("user");
var data = readUserData(user);
if(user == '') {
    window.location.replace("../index.html");
}else {
    window.title = user
}

$(document).on("click", "a", function() {
    var id = $(this).attr("id");
    if (id == "redirpage") {
        window.onbeforeunload = null
    }
});


const firebaseConfig = {
    apiKey: "AIzaSyBff6gLXbUMW0rnq4186O9d9896toadZ30",
    authDomain: "school-site-b799d.firebaseapp.com",
    projectId: "school-site-b799d",
    storageBucket: "school-site-b799d.appspot.com",
    messagingSenderId: "704109356346",
    appId: "1:704109356346:web:be6a9266093b06dbd81c03",
    measurementId: "G-VXQWNZJ3MX"
};

const db = getDatabase();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.onbeforeunload = function() {
    deleteCookie("user");
    signOut(auth)
}


let welcome = document.getElementById("welcome")
data.then(function(data) {
    welcome.innerHTML = welcome.innerHTML + " " + data.display_name;
})