// threads-home.js

$(document).ready(function () {
    console.log("Document ready");
    let idToken = '';
    let userId = '';

    // Show loading icon initially
    $("#loading").show();

    // Hide the connect button and profile info until we know the status
    $("#connectThreadsContainer").hide();
    $("#profileInfo").hide();

    // Handle the "Connect Threads Account" button
    $("#connectThreadsButton").on("click", function () {
        console.log("Connect button clicked");

        // Ensure userId is set
        if (!userId) {
            userId = sessionStorage.getItem("currentUserId");
            console.log("User ID from sessionStorage:", userId);
        }

        if (!userId) {
            alert("User ID is not available. Please log in again.");
            return;
        }

        // Save the userId in sessionStorage for later use
        sessionStorage.setItem("currentUserId", userId);

        // Generate a random state parameter for security
        const state = Math.random().toString(36).substring(2);
        sessionStorage.setItem("oauthState", state);

        const threadsAuthUrl = 'https://threads.net/oauth/authorize?client_id=1023999582681781&redirect_uri=https://scheduler-dev.pramodnanduri.workers.dev/threads/auth&scope=threads_basic,threads_content_publish&response_type=code&state=' + state;

        // Redirect the user to the authorization URL
        window.location.href = threadsAuthUrl;
    });

    // Handle user authentication
    checkAuthAndExecute((user) => {
        console.log("User authenticated:", user);
        user.getIdToken().then((token) => {
            idToken = token;
            userId = user.uid;
            console.log("ID Token:", idToken);
            console.log("User ID:", userId);

            // Save userId in sessionStorage
            sessionStorage.setItem("currentUserId", userId);

            // Call the /threads/profile API to check if Threads account is connected
            const profileAPI = "http://localhost:8787/threads/profile"; // Adjust the URL as needed

            const url = new URL(profileAPI);
            url.searchParams.append("userId", userId);

            console.log("Profile API URL:", url.toString());

            fetch(url, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + idToken,
                },
            })
                .then((response) => {
                    console.log("Response status:", response.status);
                    return response.json();
                })
                .then((data) => {
                    // Hide loading icon
                    $("#loading").hide();

                    console.log("Profile API response data:", data);

                    if (data && data.userId && data.username) {
                        // Threads account is connected
                        // Hide the "Connect Threads Account" button
                        $("#connectThreadsContainer").hide();

                        // Display the profile username and profile picture
                        $("#profileUsername").text(data.username);

                        if (data.profilePictureUrl) {
                            $("#profilePicture").attr("src", data.profilePictureUrl);
                        } else {
                            $("#profilePicture").attr("src", "/assets/images/default-profile.png"); // Default image
                        }

                        $("#profileInfo").show();

                    } else {
                        // Threads account is not connected
                        $("#connectThreadsContainer").show();
                        $("#profileInfo").hide();
                    }
                })
                .catch((error) => {
                    // Hide loading icon
                    $("#loading").hide();

                    console.error("Error fetching profile:", error);
                    alert("An error occurred while checking Threads account status.");
                    // Show the "Connect Threads Account" button
                    $("#connectThreadsContainer").show();
                });

        }).catch((error) => {
            console.error("Error getting ID token:", error.message);
            $("#loading").hide();
            $("#connectThreadsContainer").show();
        });
    });
});
