---
layout: dashboard
title: Thriendly Threads scheduler
permalink: /app/threads-scheduler
---

<div id="content">
    <div class="container mt-4 col-md-6 text-center">

        <h3 class="mb-4 text-primary">Create Thread</h3>

        <!-- ================= Scheduler code ================= -->

        <div class="row mt-4">
            <div class="col-md-8 offset-md-2">
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
                        <div class="col-md-6">
                            <div class="mb-3">
                                <button type="button" class="btn btn-primary me-2" id="createAI">Create With AI</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <button type="button" class="btn btn-success" id="scheduleButton">Schedule</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- ================= End Scheduler code ================= -->

        <!-- <div class="row mt-4">
            <div class="col-12">
                <div class="card latest-threads">
                    <div class="card-body">
                        <div class="row mt-4">

                            <div class="" id="cent">
                                <h5 class="font-weight-bold">

                                    Schedule AI powered Viral threads with our Threads Scheduler.

                                    <br><br>

                                    Coming Soon!

                                    <br><br>


                                    Join Priority waitlist here 
                                    <p class="mt-3">
                                    <a class="btn btn-success" target="_blank"
                                        href="https://forms.gle/vat3karHYLDtL1uL9">Thriendly Priority Waitlist</a>
                                    </p>


                                    <p><a target="_blank" class="btn btn-primary btn"
                                        href="https://discord.gg/7UqWEuqqhk">Join Threads
                                        Growth community</a></p>

                                </h5>
                            </div>
                            <div class="row mt-4 col-md-3">

                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div> -->

    </div>

</div>

<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<!-- <script src="{{ site.baseurl }}/assets/js/smartreply.js"></script> -->
<script src="{{ site.baseurl }}/assets/js/dashboard/threads-scheduler.js"></script>

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