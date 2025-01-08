---
layout: dashboard
title: Thriendly Threads Home
permalink: /app/bluesky/home
---

<style>
    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    /* Style for disabled cards */
    .disabled-card {
        pointer-events: none;
        opacity: 0.6;
    }

    /* Style for profile info */
    #profileInfo h5 {
        display: flex;
        align-items: left;
        color: #198755; /* Bootstrap success color */
    }

    #profilePicture {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 10px;
    }

    /* Adjusted loading icon style */
    #loading img {
        width: 30px;
        height: 30px;
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

    /* Hide content initially */
    #schedulerContent,
    #waitlistCard {
        display: none;
    }
</style>

<div id="content" class="container mt-4">
    <h3 class="mb-4 text-primary">Bluesky Scheduler</h3>

    <!-- Loading Icon -->
    <div id="loading" style="text-align: left;">
        <img src="/assets/images/tipseason-loading.gif" alt="Loading...">
    </div>

    <!-- Scheduler Content -->
    <div id="schedulerContent">
        <!-- Cards Section -->
        <div class="row mt-4" id="functionCards">
            <!-- Schedule New Thread Card -->
            <div class="col-md-4 mb-4">
                <a href="/app/bluesky/scheduler" class="text-decoration-none scheduler-card">
                    <div class="card h-100 card-hover p-2">
                        <div class="card-body text-center">
                            <i class="fa-solid fa-pen fa-3x mb-3 text-primary"></i>
                            <h5 class="card-title">Schedule New Bluesky Post</h5>
                            <p class="card-text">Compose and schedule your posts that get delivered even when you sleep!</p>
                        </div>
                    </div>
                </a>
            </div>
            <!-- List Scheduled Threads Card -->
            <div class="col-md-4 mb-4">
                <a href="/app/bluesky/list" class="text-decoration-none scheduler-card">
                    <div class="card h-100 card-hover p-2">
                        <div class="card-body text-center">
                            <i class="fa-solid fa-list fa-3x mb-3 text-primary"></i>
                            <h5 class="card-title">List Scheduled Bluesky Posts</h5>
                            <p class="card-text">View and manage your scheduled posts.</p>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Manage Profiles Card -->
            <div class="col-md-4 mb-4">
                <a href="/app/bluesky/profiles" class="text-decoration-none scheduler-card">
                    <div class="card h-100 card-hover p-2">
                        <div class="card-body text-center">
                            <i class="fa-solid fa-user fa-3x mb-3 text-primary"></i>
                            <h5 class="card-title">Manage Profiles</h5>
                            <p class="card-text">View, add, and delete your connected profiles.</p>
                        </div>
                    </div>
                </a>
            </div>


            <!-- Coming Soon Card -->
            <div class="col-md-4 mb-4">
                <a href="#" class="text-decoration-none scheduler-card">
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

    <!-- Waitlist Card -->
    <div id="waitlistCard">
        <div class="card mt-4">
            <div class="card-body">
                <div class="text-center">
                    <h5 class="font-weight-bold">
                        Schedule AI powered viral threads with our Threads Scheduler.
                        <br><br>
                        Coming Soon!
                        <br><br>
                        Join Priority Waitlist Here
                        <p class="mt-3">
                            <a class="btn btn-success" target="_blank" href="https://forms.gle/vat3karHYLDtL1uL9">Thriendly Priority Waitlist</a>
                        </p>
                        <p>
                            <a target="_blank" class="btn btn-primary" href="https://www.skool.com/thriendly">Join Threads Growth Community</a>
                        </p>
                    </h5>
                </div>
            </div>
        </div>
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
<script src="{{ site.baseurl }}/assets/js/dashboard/bluesky/bluesky-home.js"></script>
