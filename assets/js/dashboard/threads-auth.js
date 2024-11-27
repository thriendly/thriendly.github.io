// threads-auth.js

$(document).ready(function () {
    let idToken = '';
    let userId = '';

    // Function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Extract the 'code' and 'state' parameters from the URL
    const code = getQueryParam('code');

    if (!code) {
        $('#message').removeClass('alert-info').addClass('alert-danger').text('No code parameter found in the URL.');
        // Redirect after displaying the message
        setTimeout(() => {
            window.location.href = '/app/threads/home';
        }, 5000);
        return;
    }

    // Handle user authentication
    checkAuthAndExecute((user) => {
        user.getIdToken().then((token) => {
            idToken = token;
            userId = user.uid;
            
            // Construct the API URL with query parameters
            const authAPI = `${SCHEDULER_URL}/threads/auth?code=${encodeURIComponent(code)}&userId=${userId}`;


            // Send the authorization code to your backend /threads/auth endpoint
            fetch(authAPI, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + idToken,
                    // No 'Content-Type' header since we're not sending a body
                },
                // No body since we're sending data via URL parameters
            })
                .then((response) => response.json().then(data => ({ status: response.status, data })))
                .then(({ status, data }) => {
                    if (status === 200 && data && data.success) {
                        $('#message').removeClass('alert-info').addClass('alert-success').text('Connected successfully!');
                    } else {
                        console.error("Error during Threads authentication:", data);
                        $('#message').removeClass('alert-info').addClass('alert-danger').text('Connecting Threads account failed, please try again later.');
                    }
                    // Redirect after displaying the message
                    setTimeout(() => {
                        window.location.href = '/app/threads/home';
                    }, 5000);
                })
                .catch((error) => {
                    console.error("Error during Threads authentication:", error);
                    $('#message').removeClass('alert-info').addClass('alert-danger').text('An error occurred during Threads authentication.');
                    // Redirect after displaying the message
                    setTimeout(() => {
                        window.location.href = '/app/threads/home';
                    }, 5000);
                });
        }).catch((error) => {
            console.error("Error getting ID token:", error.message);
            $('#message').removeClass('alert-info').addClass('alert-danger').text('Authentication error: ' + error.message);
            // Redirect after displaying the message
            setTimeout(() => {
                window.location.href = '/app/threads/home';
            }, 5000);
        });
    });
});
