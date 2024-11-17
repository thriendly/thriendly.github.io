$(document).ready(function () {
    let idToken = '';
    let userId = '';

    // Show loading icon initially
    $("#loading").show();

    // Hide the connect button, profile info, scheduler content, and waitlist card until we know the status
    $("#connectThreadsContainer").hide();
    $("#profileInfo").hide();
    $("#schedulerContent").hide();
    $("#waitlistCard").hide();

    // Handle the "Connect Threads Account" button
    $("#connectThreadsButton").on("click", function () {

        // Ensure userId is set
        if (!userId) {
            userId = sessionStorage.getItem("currentUserId");
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

        const threadsAuthUrl = 'https://threads.net/oauth/authorize?client_id=1023999582681781&redirect_uri=https://scheduler.manigopalmurthy.workers.dev/threads/auth&scope=threads_basic,threads_content_publish&response_type=code&state=' + state;

        // Redirect the user to the authorization URL
        window.location.href = threadsAuthUrl;
    });

    // Handle user authentication
    checkAuthAndExecute((user) => {
        user.getIdToken().then((token) => {
            idToken = token;
            userId = user.uid;
            console.log("ID Token:", idToken);
            console.log("User ID:", userId);

            // Save userId in sessionStorage
            sessionStorage.setItem("currentUserId", userId);

            // Call the /users API to check user features
            const userAPI = "https://scheduler.manigopalmurthy.workers.dev/threads/schedule"; // Adjust the URL as needed

            const userUrl = new URL(userAPI);
            userUrl.searchParams.append("userId", userId);

            fetch(userUrl, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + idToken,
                },
            })
                .then((response) => response.json())
                .then((userData) => {
                    console.log("User data:", userData);

                    // Check if the user has the 'scheduler' feature
                    if (userData && userData.threadsFeatures && userData.threadsFeatures.includes("scheduler")) {
                        // User has 'scheduler' feature

                        // Now, check if Threads account is connected
                        checkThreadsProfile();
                    } else {
                        // User does not have 'scheduler' feature
                        // Hide loading icon
                        $("#loading").hide();

                        // Display the waitlist card
                        $("#waitlistCard").show();
                    }
                })
                .catch((error) => {
                    // Hide loading icon
                    $("#loading").hide();

                    console.error("Error fetching user data:", error);
                    alert("An error occurred while fetching user data.");
                });

            function checkThreadsProfile() {
                // Call the /threads/profile API to check if Threads account is connected
                const profileAPI = "https://scheduler.manigopalmurthy.workers.dev/threads/schedule"; // Adjust the URL as needed

                const url = new URL(profileAPI);
                url.searchParams.append("userId", userId);

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

                            // Show the scheduler content
                            $("#schedulerContent").show();

                        } else {
                            // Threads account is not connected
                            $("#connectThreadsContainer").show();
                            $("#profileInfo").hide();

                            // Show the scheduler content with disabled cards
                            $("#schedulerContent").show();

                            // Disable the scheduler cards
                            $(".scheduler-card").addClass("disabled-card").on("click", function (e) {
                                e.preventDefault();
                                alert("Connect Threads account to access these features.");
                            });
                        }

                    })
                    .catch((error) => {
                        // Hide loading icon
                        $("#loading").hide();

                        console.error("Error fetching profile:", error);
                        alert("An error occurred while checking Threads account status.");
                        // Show the "Connect Threads Account" button
                        $("#connectThreadsContainer").show();

                        // Show the scheduler content with disabled cards
                        $("#schedulerContent").show();

                        // Disable the scheduler cards
                        $(".scheduler-card").addClass("disabled-card").on("click", function (e) {
                            e.preventDefault();
                            alert("Connect Threads account to access these features.");
                        });
                    });
            }

        }).catch((error) => {
            console.error("Error getting ID token:", error.message);
            $("#loading").hide();
            $("#connectThreadsContainer").show();
        });
    });
});
