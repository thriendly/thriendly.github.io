$(document).ready(function () {
    let idToken = '';
    let userId = '';

    $("#connectBlueskyButton").on("click", function () {
        $("#blueskyModal").modal("show");
    });

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
            body: JSON.stringify({ blueskyUsername, blueskyPassword })
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

    function loadBlueskyProfiles() {
        $("#loading").show();

        const listUrl = SCHEDULER_URL + "/bluesky/profiles/list?userId=" + encodeURIComponent(userId);
        fetch(listUrl, {
            method: "GET",
            headers: { Authorization: "Bearer " + idToken }
        })
        .then(res => res.json())
        .then(data => {
            $("#loading").hide();
            const $profileList = $("#profileList");
            $profileList.empty();

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(account => {
                    // Clone hidden template
                    const $template = $("#blueskyProfileTemplate").clone();
                    $template.removeAttr("id").show(); // make it visible

                    // Fill profile data
                    $template.find(".username").text(account.blueskyUsername || "Unknown");

                    // If there's a profile pic from your API, replace default
                    if (account.profilePic) {
                        $template.find(".profile-pic").attr("src", account.profilePic);
                    }

                    // If it's the default account
                    if (account.isDefault === 1) {
                        $template.find(".default-badge").show();
                        $template.find(".set-default-button").prop("disabled", true).text("Default");
                    }

                    // Hook up "Set Default" button
                    $template.find(".set-default-button").on("click", () => {
                        setDefaultBlueskyProfile(account.blueskyUsername);
                    });

                    // Hook up "Delete" button
                    $template.find(".delete-button").on("click", function () {
                        if (!confirm("Delete " + account.blueskyUsername + "?")) return;

                        const deleteUrl = SCHEDULER_URL + "/bluesky/profiles/delete?userId=" +
                                          encodeURIComponent(userId) +
                                          "&blueskyUsername=" + encodeURIComponent(account.blueskyUsername);

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
                            alert("Error deleting profile.");
                        });
                    });

                    // Append the populated template to the list
                    $profileList.append($template);
                });
            } else {
                $profileList.append('<li class="no-profiles">No profiles found.</li>');
            }
        })
        .catch(error => {
            $("#loading").hide();
            console.error("Error fetching Bluesky profiles:", error);
            alert("Error fetching profiles.");
        });
    }

    // Example: setting default by calling your PATCH endpoint
    function setDefaultBlueskyProfile(username) {
        const defaultUrl = SCHEDULER_URL + "/bluesky/profiles/default?userId=" +
                           encodeURIComponent(userId) +
                           "&blueskyUsername=" + encodeURIComponent(username);

        fetch(defaultUrl, {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + idToken,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status != 200) throw new Error("Failed to set default profile");
        })
        .then(() => {
            alert("Default profile set successfully.");
            loadBlueskyProfiles();
        })
        .catch(error => {
            console.error("Error setting default profile:", error);
            alert("An error occurred. Try again later.");
        });
    }

    // Firebase auth check
    checkAuthAndExecute(user => {
        user.getIdToken()
            .then(token => {
                idToken = token;
                userId = user.uid;
                loadBlueskyProfiles();
            })
            .catch(error => {
                console.error("Error getting ID token:", error);
                $("#connectBlueskyButton").show();
            });
    });
});
