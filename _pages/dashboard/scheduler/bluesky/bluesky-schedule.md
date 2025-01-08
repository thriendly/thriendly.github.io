---
layout: dashboard
title: Thriendly Threads Scheduler
permalink: /app/bluesky/scheduler
---

{% include bluesky-scheduler.html %}

<!-- Scripts -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script>

    $(document).ready(function () {
        $('#schedulerBackButton').on('click', function () {
            if (confirm("Are you sure you want to go back? Any edits made to the post will be lost.")) {
                window.location.href = '/app/bluesky/home'; // Redirect to the desired path
            }
        });
    });
</script>