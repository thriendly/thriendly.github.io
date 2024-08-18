---
layout: mainlayout
title: Login/Signup to TipSeason
permalink: /login
---

<div class="container-fluid">
    <div class="row justify-content-center align-items-center d-flex-row text-center h-100">
        <div class="col-12 col-md-6 col-lg-4 h-50" style="margin-bottom: 100px;">
            <div class="card shadow mb-10">
                <div class="card-body mx-auto">
                    <h3 class="card-title mt-3 text-center text-info">Welcome to Thriendly!</h3>

                    <h4 class="card-title mt-3 text-center">Login</h4>
                    <p class="text-center">Enter your credentials</p>
                    <!-- <p>
                        <a href="#" class="btn btn-block btn-danger" id="googleSignInButton">
                            <i class="fab fa-google mr-2"></i>Login with Google</a>
                    </p>
                    <p class="text-muted font-weight-bold ">
                        <span>OR</span>
                    </p> -->
                    <form id="loginForm">

                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                            </div>
                            <input name="" class="form-control" placeholder="Email address" type="email" id="email">
                        </div>
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input class="form-control" placeholder="Password" type="password" id="password">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block"> Login </button>
                        </div>
                        <p class="text-center">No account Yet?
                            <a href="/signup">Sign Up</a>
                        </p>
                        <p class="text-center">
                            <a href="/forgot-password">Forgot Password</a>
                        </p>
                        <p class="text-center text-danger " id="error" style="display:none;">
                            Invalid credentials!
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- Your JavaScript code -->
<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    const analytics = getAnalytics(app);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Get the Google Sign-In button element
    /* const googleSignInButton = document.getElementById("googleSignInButton");

    // Add click event listener to the Google Sign-In button
    googleSignInButton.addEventListener("click", () => {
        // Sign in with Google using the GoogleAuthProvider instance
        loginWithGoogle();
    }); */

    function loginWithGoogle() {
        // Set persistence to browser session
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithRedirect(auth, googleProvider);
            })
            .catch((error) => {
                // Handle login error
                console.error("Email/Password Login error: ", error.message);
                $("#error").show();
                // You can display an error message to the user on the login page if needed
            });
    }

    document.addEventListener("DOMContentLoaded", function () {
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    if (result.user) {
                        console.log("User is signed in:", result.user.email);
                        window.location.href = "/app/home";
                    } else {
                        console.log("No user signed in through the redirect.");
                    }
                } else {
                    console.log("getRedirectResult returned null.");
                }
            })
            .catch((error) => {
                console.error("Google Sign-In redirect error: ", error.message);
            });
    });

    // Function to handle email/password login
    function loginWithEmailPassword(email, password) {
        // Set persistence to browser session
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Sign in with email and password
                return signInWithEmailAndPassword(auth, email, password);
            })
            .then((userCredential) => {
                // User successfully logged in
                const user = userCredential.user;
                console.log("User is signed in:", user.email);

                // Redirect to the secure home page
                window.location.href = "/app/home";
            })
            .catch((error) => {
                // Handle login error
                console.error("Email/Password Login error: ", error.message);
                $("#error").show();
                // You can display an error message to the user on the login page if needed
            });
    }

    // Get the login form element
    const loginForm = document.querySelector("form");

    // Add submit event listener to the login form
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
        $("#error").hide();

        // Get email and password from the form fields
        const email = $("#email").val();
        const password = $("#password").val();

        if (!validateCredentials(email, password)) {
            // Display an error message if credentials are invalid
            $("#error").show();
            return; // Stop further processing
        }
        // Call the loginWithEmailPassword function to authenticate the user
        loginWithEmailPassword(email, password);
    });

    // Function to validate email and password
    function validateCredentials(email, password) {
        // Check if the email and password are not empty
        if (!email || !password) {
            return false;
        }

        // Add more specific validations if needed

        return true; // Credentials are valid
    }



</script>