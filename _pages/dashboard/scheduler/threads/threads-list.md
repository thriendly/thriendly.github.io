---
layout: dashboard
title: Thriendly Scheduled Threads
permalink: /app/threads/list
---

<style>
     /* Adjusted loading icon style */
    #loading{
        display: flex;
        justify-content: center; /* Centers horizontally */
        align-items: center; /* Centers vertically */
        text-align: center;
    }

    #loading img {
        width: 50px;
        height: 50px;
    }

    .thread-content {
        white-space: pre-wrap;
        word-break: break-word;
        text-align: left;
    }

    .thread-content p {
        margin-bottom: 0.25rem;
    }

    .time-display {
        font-size: 0.875rem;
        color: #6c757d;
    }

    .clock-icon {
        margin-right: 0.25rem;
    }

    .thread-preview {
        background-color: #ffffff;
        border: 1px solid #dee2e6;
        border-radius: 0.5rem;
        padding: 15px;
        position: relative;
        margin-bottom: 20px;
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

    .action-buttons {
        display: flex;
        gap: 10px;
    }

    .btn-edit {
        background-color: #007bff; /* Blue */
        color: white;
        border: none;
        padding: 5px 10px;
    }

    .btn-delete {
        background-color: #dc3545; /* Red */
        color: white;
        border: none;
        padding: 5px 10px;
    }

    .btn-edit:hover{
        background-color: #0d53f2;
        border-color: #0d53f2;
        color: white;
    }

    .btn-delete:hover {
        background-color: #d02538;
        border-color: #d02538;
        color: white;
    }   

    .btn-edit:focus, .btn-delete:focus {
        outline: none;
    }

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
        margin-bottom: 10px;
    }

    /* Adjust modal size to avoid scrolling */
    .modal-lg {
        max-width: 75%;
    }

    .modal-body {
        max-height: calc(100vh - 200px);
        overflow-y: auto;
    }

    .modal-dialog {
        margin: 30px auto;
    }

    /* Adjust textarea to fit content */
    #updateThreadContent {
        overflow-y: auto;
        height: 150px; /* Adjust height to fill available space */
    }

    /* Place date and time pickers in the same row */
    .datetime-row {
        display: flex;
        gap: 10px;
    }

    /* Fix overflow issue in preview */
    #updatePreview {
        overflow-y: auto;
        max-height: calc(100vh - 350px); /* Adjust as needed */
    }
    
    /* Add margin between posts */
    .number-padding {
        padding-top: 20px;
    }
</style>

<div id="content">
    <div class="container mt-4 col-md-8 offset-md-2">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="text-primary">Scheduled Threads</h3>
            <a href="/app/threads/home" class="btn btn-secondary">Back</a>
        </div>

        <div id="loading" style="text-align: left;">
            <img src="/assets/images/tipseason-loading.gif" alt="Loading...">
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div id="thread-list"></div>

                <!-- Load More Button Container -->
                <div id="load-more-container" class="text-center mt-4"></div>
            </div>
        </div>
    </div>
</div>

<!-- Update Thread Modal -->
<div class="modal fade" id="updateThreadModal" tabindex="-1" aria-labelledby="updateThreadModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <form id="update-thread-form">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateThreadModalLabel">Update Thread</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- Edit Form Column -->
                        <div class="col-md-6">
                            <!-- Edit Post Header -->
                            <h5 class="section-header">Edit Post</h5>
                            <!-- Schedule Time Fields in the Same Row -->
                            <div class="mb-3 datetime-row">
                                <div style="flex: 1;">
                                    <label for="updateThreadScheduleDate" class="form-label">Schedule Date</label>
                                    <input type="date" class="form-control" id="updateThreadScheduleDate">
                                </div>
                                <div style="flex: 1;">
                                    <label for="updateThreadScheduleTime" class="form-label">Schedule Time</label>
                                    <input type="time" class="form-control" id="updateThreadScheduleTime">
                                </div>
                            </div>
                            <!-- Content Field -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea class="form-control" id="updateThreadContent" rows="10" placeholder="Enter your posts here"></textarea>
                            </div>
                            <input type="hidden" id="updateThreadPostId">
                        </div>
                        <!-- Preview Column -->
                        <div class="col-md-6">
                            <!-- Preview Header -->
                            <h5 class="preview-header">Preview</h5>
                            <div id="updatePreview">
                                <!-- Subposts will be displayed here -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span id="charCount" class="me-auto"></span>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Include necessary scripts -->
<script type="module" src="/assets/js/firebaseauth.js"></script>
<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-list.js"></script>
