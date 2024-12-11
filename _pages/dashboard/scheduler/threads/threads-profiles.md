---
layout: dashboard
title: Thriendly Connected Accounts
permalink: /app/threads/profiles
---

<style>
    /* Style for profile list */
    .profile-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .profile-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid #dee2e6;
        border-radius: 0.5rem;
        background-color: #ffffff;
        margin-bottom: 10px;
    }

    .profile-details {
        display: flex;
        align-items: center;
    }

    .profile-details img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 15px;
    }

    .profile-details .username {
        font-weight: bold;
        font-size: 1.1rem;
    }

    .profile-details .threadsUserId {
        font-size: 0.9rem;
        color: #6c757d;
    }

    .delete-button {
        background-color: #dc3545;
        border: none;
        color: #fff;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .delete-button:hover {
        background-color: #c82333;
    }

    /* Style for profile info (if needed) */
    #profileInfo h5 {
        display: flex;
        align-items: center;
        color: #198755; /* Bootstrap success color */
    }

    #profilePicture {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 10px;
    }

    /* Adjusted loading icon style */
    #loading {
        display: none; /* Initially hidden, shown via JS */
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #loading img {
        width: 50px;
        height: 50px;
    }

    /* Style the Connect button */
    #connectThreadsButton {
        color: #fff;
        background-color: #198755; /* Bootstrap success color */
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    #connectThreadsButton:hover {
        background-color: #218838; /* Darker green on hover */
    }

    /* Container for Connect button to keep it visible */
    .connect-button-container {
        margin-bottom: 20px;
        text-align: left;
    }

    /* Style for "No profiles found" message */
    .no-profiles {
        text-align: center;
        color: #6c757d;
        font-size: 1rem;
        padding: 20px;
        border: 1px dashed #dee2e6;
        border-radius: 0.5rem;
        background-color: #f8f9fa;
    }
</style>

<div id="content" class="container mt-4">
    <h3 class="mb-4 text-primary">Thriendly Threads Scheduler</h3>

    <!-- Connect Threads Account Button -->
    <div class="connect-button-container" id="connectThreadsContainer">
        <button id="connectThreadsButton">
            Connect Threads Account
        </button>
    </div>


    <!-- Loading Icon -->
    <div id="loading">
        <img src="/assets/images/tipseason-loading.gif" alt="Loading...">
    </div>


    <!-- Profiles List -->
    <ul class="profile-list" id="profileList"></ul>

    <!-- Profile Info (Optional, can be removed if not needed) -->
    <div id="profileInfo" style="display: none;">
        <h5>
            Scheduling threads for:&nbsp;<img id="profilePicture" src="" alt="Profile Picture"> &nbsp; <span id="profileUsername"></span>
        </h5>
    </div>
</div>

<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<!-- Include jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-profiles.js"></script>
