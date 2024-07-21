---
layout: dashboard
title: Thriendly Threads Dashboard - Fastest way to grow on threads
permalink: /app/threads-scheduler
---

<div id="content">
    <div class="container mt-4 col-md-6">

        <h3 class="mb-4 text-primary">Thriendly Threads Templates</h3>


        <div class="row mt-4">
            <div class="col-12">
                <div class="card latest-threads">
                    <div class="card-body">
                        <div class="row mt-4">


                            <!-- WRITE CODE HERE -->


                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script src="{{ site.baseurl }}/assets/js/smartreply.js"></script>

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