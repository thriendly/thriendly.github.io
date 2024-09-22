---
layout: dashboard
title: Thriendly Threads scheduler
permalink: /app/threads/list
---

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
                <nav>
                    <ul class="pagination justify-content-center" id="pagination"></ul>
                </nav>
            </div>
        </div>

        <!-- ================= End of Listing code ================= -->
    </div>

</div>

<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<!-- <script src="{{ site.baseurl }}/assets/js/smartreply.js"></script> -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-list.js"></script>

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