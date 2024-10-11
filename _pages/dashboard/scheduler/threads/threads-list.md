---
layout: dashboard
title: Thriendly Threads scheduler
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
    <div class="container mt-4 col-md-6 text-center">
        <!-- ================= Listing code ================= -->

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="text-primary">Scheduled Threads</h3>
            <a href="/app/threads/scheduler" class="btn btn-primary">Create Thread</a>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <div id="thread-list"></div>

                <!-- Load More Button Container -->
                <div id="load-more-container" class="text-center mt-4"></div>
            </div>
        </div>

        <!-- ================= End of Listing code ================= -->
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
            <label for="threadContent" class="form-label">Content</label>
            <textarea class="form-control" id="threadContent" rows="5"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <input type="hidden" id="threadPostId">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-list.js"></script>

<script type="module">
    import { checkAuthAndExecute } from "{{ site.baseurl }}/assets/js/firebaseauth.js";
</script>

<!-- Include Bootstrap JS and jQuery if not already included -->
<!-- Place these scripts before the closing </body> tag -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
