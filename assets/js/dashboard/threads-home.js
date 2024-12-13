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

        // Generate a random state parameter for security
        const state = Math.random().toString(36).substring(2);
        sessionStorage.setItem("oauthState", state);

        const threadsAuthUrl = 'https://threads.net/oauth/authorize?client_id=1023999582681781&redirect_uri=https://thriendly.com/app/threads/auth&scope=threads_basic,threads_content_publish,threads_manage_replies,threads_manage_insights,threads_read_replies&response_type=code&state=' + state;

        // Redirect the user to the authorization URL
        window.location.href = threadsAuthUrl;
    });
    
    // Handle "Back" button click on scheduler page
    $('#schedulerBackButton').on('click', function () {
        if (confirm("Are you sure you want to go back? Any edits made to the post will be lost.")) {
            $('#schedulerContainer').hide();
            $('#GenerationContainer').show();
        }
    });

    // Handle user authentication
    checkAuthAndExecute((user) => {
        user.getIdToken().then((token) => {
            idToken = token;
            userId = user.uid;

            // Call the /users API to check user features
            const userAPI = `${SCHEDULER_URL}/users`; // Adjust the URL as needed

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

                    // Check if the user has the 'scheduler' feature
                    if (userData && userData.threadsFeatures.includes("scheduler")) {
                        // User has 'scheduler' feature
                        $("#loading").hide();
                        // Show the scheduler content
                        $("#schedulerContent").show();
                        
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

        }).catch((error) => {
            console.error("Error getting ID token:", error.message);
            $("#loading").hide();
            $("#connectThreadsContainer").show();
        });
    });
});
