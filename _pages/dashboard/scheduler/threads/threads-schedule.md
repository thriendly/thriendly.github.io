---
layout: dashboard
title: Thriendly Threads Scheduler
permalink: /app/threads/scheduler
---

<div id="content">
    <div class="container mt-4 col-md-8 offset-md-2">
        <h3 class="mb-4 text-primary">Create Thread</h3>

        <!-- Scheduler Form -->
        <div class="row mt-4">
            <div class="col-md-12">
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
                            <a href="/app/threads/home" class="btn btn-secondary me-2">Back</a>
                            <button type="button" class="btn btn-success" id="scheduleButton">Schedule</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-scheduler.js"></script>
