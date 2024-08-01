<!DOCTYPE html>
<html>
<head>
  <title>Email Verification</title>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
  <script>
    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCbf0LeMex9k1JkVYLEF72tlVUbAztU6Rc",
      authDomain: "thetipseason.firebaseapp.com",
      projectId: "thetipseason",
      storageBucket: "thetipseason.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    window.onload = function() {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get('oobCode');

      if (oobCode) {
        // Verify the email address
        firebase.auth().applyActionCode(oobCode)
          .then(function() {
            // Email has been verified successfully
            // Redirect to login page
            window.location.href = '/login';
          })
          .catch(function(error) {
            // Handle errors
            console.error("Error verifying email:", error);
            alert("There was an error verifying your email. Please try again.");
          });
      } else {
        // Handle the case where oobCode is missing
        alert("Invalid verification link.");
      }
    }
  </script>
</head>
<body>
  <h1>Verifying your email...</h1>
</body>
</html>
