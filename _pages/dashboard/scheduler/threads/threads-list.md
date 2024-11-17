---
layout: dashboard
title: Thriendly Scheduled Threads
permalink: /app/threads/list
---

<style>
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
</style>

<div id="content">
    <div class="container mt-4 col-md-8 offset-md-2">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="text-primary">Scheduled Threads</h3>
            <a href="/app/threads/home" class="btn btn-secondary">Back</a>
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
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="update-thread-form">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateThreadModalLabel">Update Thread</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="updateThreadContent" class="form-label">Content</label>
                        <textarea class="form-control" id="updateThreadContent" rows="4" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="updateThreadScheduleTime" class="form-label">Schedule Time</label>
                        <input type="datetime-local" class="form-control" id="updateThreadScheduleTime">
                    </div>
                    <input type="hidden" id="updateThreadPostId">
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-list.js"></script>
