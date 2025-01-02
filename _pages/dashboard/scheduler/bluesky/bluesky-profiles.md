---
layout: dashboard
title: Thriendly Connected Accounts
permalink: /app/bluesky/profiles
---

<style>
    /* Shared styles for profile list UI */
    .profile-list {
        list-style: none; padding: 0; margin: 0;
    }
    .profile-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px; border: 1px solid #dee2e6; border-radius: 0.5rem; background-color: #fff;
        margin-bottom: 10px;
    }
    .profile-details .username {
        font-weight: bold; font-size: 1.1rem;
    }
    .delete-button {
        background-color: #dc3545; border: none; color: #fff; padding: 6px 12px;
        border-radius: 4px; cursor: pointer; font-size: 0.9rem;
    }
    .delete-button:hover {
        background-color: #c82333;
    }
    .no-profiles {
        text-align: center; color: #6c757d; font-size: 1rem; padding: 20px;
        border: 1px dashed #dee2e6; border-radius: 0.5rem; background-color: #f8f9fa;
    }
    #connectBlueskyButton {
        color: #fff; background-color: #198755; border: none; padding: 10px 20px;
        font-size: 1rem; border-radius: 4px; cursor: pointer; margin-bottom: 20px;
    }
</style>

<div id="content" class="container mt-4">
    <h3 class="mb-4 text-primary">Thriendly Bluesky Scheduler</h3>

    <!-- Connect Bluesky Account Button -->
    <button id="connectBlueskyButton">Connect Bluesky Account</button>

    <!-- Loading Icon -->
    <div id="loading" style="display: none; text-align:center;">
        <img src="/assets/images/tipseason-loading.gif" alt="Loading..." width="50" height="50">
    </div>

    <!-- Profiles List -->
    <ul class="profile-list" id="profileList"></ul>
</div>

<!-- Modal for adding Bluesky account -->
<div class="modal fade" id="blueskyModal" tabindex="-1" aria-labelledby="blueskyModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="blueskyModalLabel">Connect Bluesky Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="blueskyForm">
          <div class="mb-3">
            <label for="blueskyUsername" class="form-label">Bluesky Username</label>
            <input type="text" class="form-control" id="blueskyUsername" required>
          </div>
          <div class="mb-3">
            <label for="blueskyPassword" class="form-label">Bluesky App Password</label>
            <input type="password" class="form-control" id="blueskyPassword" required>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="saveBlueskyAccount">Save</button>
      </div>
    </div>
  </div>
</div>

<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>

<script>
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
            if (!response.ok) throw new Error("Add failed");
            return response.json();
        })
        .then(() => {
            alert("Bluesky account added successfully.");
            $("#blueskyModal").modal("hide");
            loadBlueskyProfiles();
        })
        .catch(error => {
            console.error("Error adding profile:", error);
            alert("Error adding profile. Check console.");
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
</script>
