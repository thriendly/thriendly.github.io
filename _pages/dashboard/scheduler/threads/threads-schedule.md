---
layout: dashboard
title: Thriendly Threads Scheduler
permalink: /app/threads/scheduler
---

{% include thread-scheduler.html %}

<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-scheduler.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>

