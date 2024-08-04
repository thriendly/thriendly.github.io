---
layout: mainlayout
title: Reset Password - TipSeason
permalink: /reset-password
---

<div class="container-fluid">
    <div class="row justify-content-center align-items-center d-flex-row text-center h-100">
        <div class="col-12 col-md-6 col-lg-4 h-50" style="margin-bottom: 100px;">
            <div class="card shadow mb-10">
                <div class="card-body mx-auto">
                    <h3 class="card-title mt-3 text-center text-info">Reset Password</h3>

                    <h4 class="card-title mt-3 text-center">Enter New Password</h4>
                    <p class="text-center">Enter and confirm your new password below.</p>

                    <form id="resetPasswordForm">
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input class="form-control" placeholder="New Password" type="password" id="newPassword">
                        </div>
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input class="form-control" placeholder="Confirm Password" type="password" id="confirmPassword">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block"> Reset Password </button>
                        </div>
                        <p class="text-center">
                            <a href="/login">Back to Login</a>
                        </p>
                        <p class="text-center text-success" id="successMessage" style="display:none;">
                            Password has been updated successfully.
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

<!-- Your JavaScript code -->
<script type="module" src="/assets/js/firebaseauth-core.js"></script>

<script type="module">
    import { auth } from "/assets/js/firebaseauth-core.js";
    import { getAuth, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

    // Extract the action code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode'); // Code sent in the password reset email

    document.querySelector("#resetPasswordForm").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const newPassword = document.querySelector("#newPassword").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;

        // Basic validation
        if (newPassword !== confirmPassword) {
            document.querySelector("#errorMessage").textContent = "Passwords do not match.";
            document.querySelector("#errorMessage").style.display = "block";
            return;
        }

        if (newPassword.length < 6) {
            document.querySelector("#errorMessage").textContent = "Password must be at least 6 characters long.";
            document.querySelector("#errorMessage").style.display = "block";
            return;
        }

        // Confirm password reset
        confirmPasswordReset(auth, oobCode, newPassword)
            .then(() => {
                // Password reset successful
                document.querySelector("#successMessage").style.display = "block";
                document.querySelector("#errorMessage").style.display = "none";
            })
            .catch((error) => {
                // Handle errors
                console.error("Error resetting password: ", error.message);
                document.querySelector("#errorMessage").textContent = "An error occurred. Please try again.";
                document.querySelector("#errorMessage").style.display = "block";
                document.querySelector("#successMessage").style.display = "none";
            });
    });
</script>
