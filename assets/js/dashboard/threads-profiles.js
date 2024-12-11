$(document).ready(function () {
    let idToken = '';
    let userId = '';

    // Show loading icon initially
    $("#loading").show();

    // Handle the "Connect Threads Account" button
    $("#connectThreadsButton").on("click", function () {
        // Generate a random state parameter for security
        const state = Math.random().toString(36).substring(2);
        sessionStorage.setItem("oauthState", state);

        const threadsAuthUrl = 'https://threads.net/oauth/authorize?client_id=1023999582681781&redirect_uri=https://thriendly.com/app/threads/auth&scope=threads_basic,threads_content_publish,threads_manage_replies,threads_manage_insights,threads_read_replies&response_type=code&state=' + state;

        // Redirect the user to the authorization URL
        window.location.href = threadsAuthUrl;
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

                    // Check if the user has the 'multi-account' feature
                    if (userData && userData.threadsFeatures && userData.threadsFeatures.includes("accounts")) {
                        // User has 'multi-account' feature

                        // Now, check if Threads account is connected
                        loadThreadsProfiles();
                    } else {
                        // Hide loading icon
                        $("#loading").hide();

                        // Display the waitlist card or a message
                        alert("You do not have access to account features.");
                        $("#connectThreadsContainer").show();
                    }
                })
                .catch((error) => {
                    // Hide loading icon
                    $("#loading").hide();

                    console.error("Error fetching user data:", error);
                    alert("An error occurred while fetching user data.");
                });

            function loadThreadsProfiles() {
                // Call the /threads/profile API to fetch all connected profiles
                const profileAPI = `${SCHEDULER_URL}/threads/profile`; // Adjust the URL as needed

                const url = new URL(profileAPI);
                url.searchParams.append("userId", userId);

                fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + idToken,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Hide loading icon
                        $("#loading").hide();

                        const $profileList = $("#profileList");
                        $profileList.empty();

                        if (data && Array.isArray(data) && data.length > 0) {
                            data.forEach(account => {
                                const picUrl = account.profilePictureUrl;
                                const listItem = `
                                    <li class="profile-item">
                                        <div class="profile-details">
                                            <img src="${picUrl}" alt="${account.username}'s Profile Picture" onerror="this.src='/assets/images/default-profile.png'">
                                            <div>
                                                <div class="username">${account.username}</div>
                                            </div>
                                        </div>
                                        <button class="delete-button" data-threads-user-id="${account.threadsUserId}">Delete</button>
                                    </li>
                                `;
                                $profileList.append(listItem);
                            });

                            // Attach delete event handler
                            $profileList.off("click", ".delete-button").on("click", ".delete-button", function () {
                                const threadsUserId = $(this).data("threads-user-id");
                                const $button = $(this);

                                if (confirm("Are you sure you want to delete this profile?")) {
                                    // Construct the DELETE URL with threadsUserId as a parameter
                                    const deleteURL = `${SCHEDULER_URL}/accounts/delete?userId=${encodeURIComponent(userId)}&threadsUserId=${encodeURIComponent(threadsUserId)}`;

                                    // Disable the button to prevent multiple clicks
                                    $button.prop('disabled', true).text('Deleting...');

                                    fetch(deleteURL, {
                                        method: 'DELETE',
                                        headers: {
                                            Authorization: "Bearer " + idToken,
                                            "Content-Type": "application/json",
                                        },
                                    })
                                        .then(res => {
                                            if (res.status != 200) {
                                                throw new Error('Network response was not ok');
                                            }
                                            return res.json();
                                        })
                                        .then(() => {
                                            alert("Profile deleted successfully.");
                                            // Remove the profile from the list
                                            $button.closest('.profile-item').remove();

                                            // If no profiles left, show a message
                                            if ($profileList.children().length === 0) {
                                                $profileList.append('<li class="no-profiles">No profiles found.</li>');
                                            }
                                        })
                                        .catch(error => {
                                            console.error("Error deleting profile:", error);
                                            alert("An error occurred while deleting the profile.");
                                            // Re-enable the button
                                            $button.prop('disabled', false).text('Delete');
                                        });
                                }
                            });
                        } else {
                            $profileList.append('<li class="no-profiles">No profiles found.</li>');
                        }
                    })
                    .catch((error) => {
                        // Hide loading icon
                        $("#loading").hide();

                        console.error("Error fetching profiles:", error);
                        alert("An error occurred while fetching Threads profiles.");
                    });
            }

        }).catch((error) => {
            console.error("Error getting ID token:", error.message);
            $("#loading").hide();
            $("#connectThreadsContainer").show();
        });
    });
});
