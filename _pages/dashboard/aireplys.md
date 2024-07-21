---
layout: dashboard
title: Thriendly Threads Dashboard - Fastest way to grow on threads
permalink: /app/aireplys
---

<div id="content">
    <div class="container mt-4 col-md-6">

        <h3 class="mb-4">Thriendly: AI Replys</h3>

        <div class="row">
            <div class="col-12">
                <div class="card latest-threads">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="" id="cent">
                                <h5 class="font-weight-bold text-success">Total Credits: <span id="credits"></span>
                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="" id="cent">
                                <hr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="" id="cent">
                                <form id="apiKeyForm">
                                    <div class="mb-3">
                                        <h5><label for="apiKeyLabel" class="form-label">Your Account Key</label>
                                        </h5>
                                        <div class="input-group mb-3 input-group-md">
                                            <input id="apiKey" name="apiKeyLabel" type="text" readonly
                                                class="form-control ts-border-surround border-info"
                                                placeholder="Click Generate Key" aria-label="Click Generate Key"
                                                aria-describedby="basic-addon2">
                                            <div class="input-group-append">
                                                <button id="copyBtn" class="btn btn-outline-info" type="button">Copy
                                                    <i class="fa fa-copy"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Generate Key</button>
                                    <img src="/assets/images/tipseason-loading.gif" id="loading">
                                    <div style="display:none;" id="error" class="text-danger">Error fetching data.Please
                                        try again in sometime !</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <div class="card latest-threads">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="" id="cent">
                                <h5 class="font-weight-bold">
                                    Enter this account key on the Chrome extension that you installed.
                                    <br><br>

                                    Each AI Reply consumes 1 credit.

                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="" id="cent">
                                <hr>
                            </div>
                        </div>
                        <div class="row">

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