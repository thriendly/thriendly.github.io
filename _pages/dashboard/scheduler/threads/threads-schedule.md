---
layout: dashboard
title: Thriendly Threads scheduler
permalink: /app/threads/scheduler
---

<div id="content">
    <div class="container mt-4 col-md-6 text-center">

        <h3 class="mb-4 text-primary">Create Thread</h3>

        <!-- ================= Scheduler code ================= -->

        <div class="row mt-4">
            <div class="col-md-8 offset-md-2">
                <form id="threadForm" class="border p-2">
                    <div class="mb-3">
                        <label for="threadContent" class="form-label">Enter your content here</label>
                        <textarea class="form-control" id="threadContent" rows="6"></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="date" class="col-form-label">Select Date:</label>
                                <input type="date" class="form-control" id="date" name="date">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="appt" class="col-form-label">Select Time:</label>
                                <input type="time" class="form-control" id="appt" name="appt">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="text-center mb-3">
                                <a href="/app/threads/list" class="btn btn-primary me-2" id="viewThreads">View Threads</a>
                                <button type="button" class="btn btn-success" id="scheduleButton">Schedule</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>

</div>

<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<!-- <script src="{{ site.baseurl }}/assets/js/smartreply.js"></script> -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-scheduler.js"></script>

<script type="module">
    import { checkAuthAndExecute } from "{{ site.baseurl }}/assets/js/firebaseauth.js";

    /* // On profile page
    checkAuthAndExecute(
        (user) => {
            console.log("Inside smart reply page : " + user);
            // User is signed in
            console.log("Inside smart reply page User is signed in:", user.email);
            console.log("Inside smart reply page User token:", user.getIdToken());
            user.getIdToken()
                .then((idToken) => {
                    // idToken contains the ID token string
                    console.log("ID Token:", idToken);
                })
                .catch((error) => {
                    console.error("Error getting ID token:", error.message);
                });
        }
    ); */

</script>
