---
layout: mainlayout
title: Forgot Password - TipSeason
permalink: /forgot-password
---

<div class="container-fluid">
    <div class="row justify-content-center align-items-center d-flex-row text-center h-100">
        <div class="col-12 col-md-6 col-lg-4 h-50" style="margin-bottom: 100px;">
            <div class="card shadow mb-10">
                <div class="card-body mx-auto">
                    <h3 class="card-title mt-3 text-center text-info">Forgot Password</h3>

                    <h4 class="card-title mt-3 text-center">Reset Your Password</h4>
                    <p class="text-center">Enter your email address to receive a password reset link.</p>

                    <form id="forgotPasswordForm">

                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                            </div>
                            <input class="form-control" placeholder="Email address" type="email" id="resetEmail">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block"> Send Reset Link </button>
                        </div>
                        <p class="text-center">
                            <a href="/login">Back to Login</a>
                        </p>
                        <p class="text-center text-success" id="successMessage" style="display:none;">
                            A password reset link has been sent to your email address.
                        </p>
                        <p class="text-center text-danger" id="errorMessage" style="display:none;">
                            An error occurred. Please try again.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="module" src="/assets/js/firebaseauth-core.js"></script>
<!-- Your JavaScript code -->
<script type="module">
    import { auth } from "/assets/js/firebaseauth-core.js";
    import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


    // Get the forgot password form element
    const forgotPasswordForm = document.querySelector("#forgotPasswordForm");

    // Add submit event listener to the forgot password form
    forgotPasswordForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Get email from the form field
        const email = document.querySelector("#resetEmail").value;

        // Validate email
        if (!validateEmail(email)) {
            document.querySelector("#errorMessage").textContent = "Please enter a valid email address.";
            document.querySelector("#errorMessage").style.display = "block";
            return;
        }

        // Send password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent successfully
                document.querySelector("#successMessage").style.display = "block";
                document.querySelector("#errorMessage").style.display = "none";
            })
            .catch((error) => {
                // Handle errors
                console.error("Error sending password reset email: ", error.message);
                document.querySelector("#errorMessage").textContent = "An error occurred. Please try again.";
                document.querySelector("#errorMessage").style.display = "block";
                document.querySelector("#successMessage").style.display = "none";
            });
    });

    // Function to validate email
    function validateEmail(email) {
        // Simple email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
</script>
