---
layout: dashboard
title: Thriendly Threads Scheduler
permalink: /app/threads/scheduler
---

<!-- Include CSS styles for the preview -->
<style>
    .section-header {
        background-color: #007bff; /* Blue background */
        color: white;              /* White text */
        padding: 10px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .preview-header {
        background-color: #28a745; /* Green background */
        color: white;              /* White text */
        padding: 10px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .datetime-row {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }

    .thread-preview {
        background-color: #ffffff;
        border: 1px solid #dee2e6;
        border-radius: 0.5rem;
        padding: 15px;
        margin-bottom: 20px;
        position: relative;
    }

    .thread-number {
        position: absolute;
        top: -10px;
        left: 10px;
        background-color: #007bff;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .thread-content {
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .char-count {
        font-size: 0.8rem;
        color: #6c757d;
    }
    .connecting-line {
        width: 3px;
        background-color: #007bff; /* Blue */
        height: 20px;
        margin: 0 auto;
        position: absolute;
        left: 21px; /* Move line towards left side */
        bottom: -20px;
    }
</style>

<div id="content">
    <div class="container mt-4">
        <!-- Header Row -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="text-primary">Schedule a Thread</h3>
            <a href="/app/threads/home" class="btn btn-secondary">Back</a>
        </div>
        <!-- Compose and Preview Headers Row -->
        <div class="row">
            <div class="col-md-6">
                <h5 class="section-header">Compose Thread</h5>
            </div>
            <div class="col-md-6">
                <h5 class="preview-header">Preview</h5>
            </div>
        </div>
        <!-- Content Row -->
        <div class="row">
            <!-- Scheduler Form Column -->
            <div class="col-md-6">
                <form id="threadForm" class="border p-2">
                    <!-- Date and Time Inputs at the Top -->
                    <div class="mb-3 datetime-row">
                        <div style="flex: 1;">
                            <label for="date" class="col-form-label">Select Date:</label>
                            <input type="date" class="form-control" id="date" name="date">
                        </div>
                        <div style="flex: 1;">
                            <label for="appt" class="col-form-label">Select Time:</label>
                            <input type="time" class="form-control" id="appt" name="appt">
                        </div>
                    </div>
                    <!-- Scheduler Form Fields -->
                    <div class="mb-3">
                        <label for="threadContent" class="form-label">Enter your content here</label>
                        <textarea class="form-control" id="threadContent" placeholder="use '---' to create a sub-thread." rows="10"></textarea>
                        <small class="form-text text-muted">Use '---' to create a new sub-thread.</small>
                    </div>
                    <!-- Schedule Button -->
                    <div class="row">
                        <div class="text-center mb-3">
                            <button type="button" class="btn btn-success" id="scheduleButton">Schedule</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Preview Column -->
            <div class="col-md-6">
                <div id="preview">
                    <!-- Subposts will be displayed here -->
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-scheduler.js"></script>
