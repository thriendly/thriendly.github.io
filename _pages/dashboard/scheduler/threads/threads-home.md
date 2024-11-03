---
layout: dashboard
title: Thriendly Threads Home
permalink: /app/threads/home
---

<style>
    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    /* Style for profile info */
    #profileInfo h5 {
        display: flex;
        align-items: left;
    }

    #profilePicture {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 10px;
    }

    /* Adjusted loading icon style */
    #loading img {
        width: 30px;
        height: 30px;
    }

    
    /* Make profile info text black */
    #profileInfo h5 {
        color: #198755; /* Black color */
    }

    /* Style the Connect button */
    #connectThreadsButton {
        color: #fff;
        background-color: #198755; /* Bootstrap success color */
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        border-radius: 4px;
    }

    #connectThreadsButton:hover {
        background-color: #218838; /* Darker green on hover */
    }
</style>

<div id="content" class="container mt-4">
    <h3 class="mb-4 text-primary">Thriendly Threads Scheduler</h3>

    <!-- Loading Icon -->
    <div id="loading" style="display: none; text-align: left;">
        <img src="/assets/images/tipseason-loading.gif" alt="Loading...">
    </div>

    <!-- Connect Threads Account Button -->
    <div class="mb-4" id="connectThreadsContainer" style="display: none;">
        <h5>
            <button id="connectThreadsButton">
                Connect Threads Account
            </button>
        </h5>
    </div>

    <!-- Profile Info -->
    <div id="profileInfo" style="display: none;">
        <h5>
            Scheduling threads for: &nbsp; &nbsp; <span id="profileUsername"></span>
            <img id="profilePicture" src="" alt="Profile Picture">
        </h5>
    </div>

    <!-- Cards Section -->
    <div class="row mt-4" id="functionCards">
        <!-- Schedule New Thread Card -->
        <div class="col-md-4 mb-4">
            <a href="/app/threads/scheduler" class="text-decoration-none">
                <div class="card h-100 card-hover p-2">
                    <div class="card-body text-center">
                        <i class="fa-solid fa-pen fa-3x mb-3 text-primary"></i>
                        <h5 class="card-title">Schedule New Thread</h5>
                        <p class="card-text">Compose and schedule your Threads posts that get delivered even when you sleep!</p>
                    </div>
                </div>
            </a>
        </div>
        <!-- List Scheduled Threads Card -->
        <div class="col-md-4 mb-4">
            <a href="/app/threads/list" class="text-decoration-none">
                <div class="card h-100 card-hover p-2">
                    <div class="card-body text-center">
                        <i class="fa-solid fa-list fa-3x mb-3 text-primary"></i>
                        <h5 class="card-title">List Scheduled Threads</h5>
                        <p class="card-text">View and manage your scheduled threads.</p>
                    </div>
                </div>
            </a>
        </div>
        <!-- Coming Soon Card -->
        <div class="col-md-4 mb-4">
            <a href="#" class="text-decoration-none">
                <div class="card h-100 card-hover p-2">
                    <div class="card-body text-center">
                        <i class="fa-solid fa-plus fa-3x mb-3 text-primary"></i>
                        <h5 class="card-title">More Features Coming Soon</h5>
                        <p class="card-text">Stay tuned for more exciting features!</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>

<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<!-- Include jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-home.js"></script>
