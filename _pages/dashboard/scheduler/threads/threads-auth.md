---
layout: dashboard
title: Thriendly Threads Authentication
permalink: /app/threads/auth
---

<div id="content" class="container mt-4">
    <h3 class="mb-4 text-primary">Connecting Your Threads Account...</h3>
    <div id="message" class="alert alert-info">Please wait while we authenticate your Threads account.</div>
</div>

<!-- Scripts -->
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Bootstrap JS and its dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include the JavaScript file -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-auth.js"></script>
