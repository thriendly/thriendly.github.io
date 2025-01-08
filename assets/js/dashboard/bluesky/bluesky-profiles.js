$(document).ready(function () {
    let idToken = '';
    let userId = '';

    // Open modal on button click
    $("#connectBlueskyButton").on("click", function () {
        $("#blueskyModal").modal("show");
    });

    // Save new Bluesky account
    $("#saveBlueskyAccount").on("click", function () {
        const blueskyUsername = $("#blueskyUsername").val().trim();
        const blueskyPassword = $("#blueskyPassword").val().trim();
        if (!blueskyUsername || !blueskyPassword) {
            alert("Please fill out both fields.");
            return;
        }

        const addUrl = SCHEDULER_URL + "/bluesky/profiles/add?userId=" + encodeURIComponent(userId);
        fetch(addUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + idToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                blueskyUsername: blueskyUsername,
                blueskyPassword: blueskyPassword
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Error adding profile.");
            return response.json();
        })
        .then(() => {
            alert("Bluesky account added successfully.");
            $("#blueskyModal").modal("hide");
            loadBlueskyProfiles();
        })
        .catch(error => {
            console.error("Error adding profile:", error);
            alert("Error adding profile. Incorrect username or Password");
        });
    });

    // Fetch and display Bluesky profiles
    function loadBlueskyProfiles() {
        $("#loading").show();
        const listUrl = SCHEDULER_URL + "/bluesky/profiles/list?userId=" + encodeURIComponent(userId);
        fetch(listUrl, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + idToken
            }
        })
        .then(res => res.json())
        .then(data => {
            $("#loading").hide();
            const $profileList = $("#profileList");
            $profileList.empty();

            if (data && Array.isArray(data) && data.length > 0) {
                data.forEach(account => {
                    const username = account.blueskyUsername || "Unknown";
                    const listItem = `
                        <li class="profile-item">
                            <div class="profile-details">
                                <div class="username">${username}</div>
                            </div>
                        </li>
                    `;
                    $profileList.append(listItem);
                });

                // Delete event
                $profileList.off("click", ".delete-button").on("click", ".delete-button", function () {
                    const delUsername = $(this).data("bluesky-username");
                    if (!confirm("Delete " + delUsername + "?")) return;

                    const deleteUrl = SCHEDULER_URL + "/bluesky/profiles/delete?userId=" +
                                      encodeURIComponent(userId) +
                                      "&blueskyUsername=" + encodeURIComponent(delUsername);

                    // Optional: Disable button while deleting
                    $(this).prop('disabled', true).text('Deleting...');

                    fetch(deleteUrl, {
                        method: 'DELETE',
                        headers: { Authorization: "Bearer " + idToken }
                    })
                    .then(res => {
                        if (!res.ok) throw new Error("Delete failed");
                        return res.json();
                    })
                    .then(() => {
                        alert("Profile deleted.");
                        loadBlueskyProfiles();
                    })
                    .catch(error => {
                        console.error("Delete error:", error);
                        alert("Error deleting profile. Check console.");
                    });
                });

            } else {
                $profileList.append('<li class="no-profiles">No profiles found.</li>');
            }
        })
        .catch(error => {
            $("#loading").hide();
            console.error("Error fetching Bluesky profiles:", error);
            alert("Error fetching profiles. Check console.");
        });
    }

    // Firebase auth check
    checkAuthAndExecute((user) => {
        user.getIdToken().then((token) => {
            idToken = token;
            userId = user.uid;
            loadBlueskyProfiles();
        }).catch(error => {
            console.error("Error getting ID token:", error);
            $("#connectBlueskyButton").show();
        });
    });
});
