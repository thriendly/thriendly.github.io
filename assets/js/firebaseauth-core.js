// firebaseauth-core.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbf0LeMex9k1JkVYLEF72tlVUbAztU6Rc",
    authDomain: "thetipseason.firebaseapp.com",
    projectId: "thetipseason",
    storageBucket: "thetipseason.appspot.com",
    messagingSenderId: "987994279894",
    appId: "1:987994279894:web:b9b77c974a902068ec5e77",
    measurementId: "G-2VTGDC811Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth for use in other scripts
export { auth };
