---
layout: dashboard
title: Thriendly Threads Dashboard - Fastest way to grow on threads
permalink: /app/aireplys
---

<div id="content">
    <div class="container mt-4 col-md-6">

        <h2 class="mb-4">Thriendly: AI Engagement</h2>
        <h5 class="mb-4">10X faster and valuable engagmenets with AI powered replys</h5>

        <div class="row">
            <div class="col-12">
                <div class="card latest-threads">
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="" id="cent">
                                <h5 class="font-weight-bold text-success">Total Credits: <span id="credits">50</span>
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

                        <div class="row">
                            <div class="">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <p>80% of Threads followers come from valuable comments to others posts.</p>
                            <p>Thriendly AI Reply chrome extension helps you create engaging comments that convert to
                                followers in 1 click.</p>
                            <p>Get started with Thriendly below 👇 </p>
                        </div>

                        <div class="row">
                            <div class="">
                                <hr>
                            </div>
                        </div>

                        <div class="row">
                            <div class="">
                                <p><b>To Use Thriendly AI Replys for Threads / X:</b></p>
                                <ol>
                                    <li>Install our Thriendly chrome extension to create "AI Reply" button under
                                        Threads / X posts </li>
                                    <a target="_blank" class="btn btn-success mt-4"
                                        href="https://chromewebstore.google.com/detail/thriendly-fastest-way-to/pkcbhfpjmikbphjgaibckpnemgbmahkm"><i
                                            class="fa-brands fa-chrome"></i> Install
                                        Chrome Extension</a>
                                    <li class="mt-4">Once you install, Enter the account key above (You can click
                                        "Generate Key" above if its empty) in the Chrome
                                        extension that
                                        you installed</li>
                                </ol>
                                Note: Each AI Reply consumes 1 credit.
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-12">
                    <div class="card latest-threads">
                        <div class="card-body">

                            <p><b>Thriendly extension account key setup:</b></p>

                            <div class="row">
                                <iframe src="https://www.youtube.com/embed/GPii9SI7I7Y?vq=hd720p60" height="500"
                                    width="100%" title="Thriendly Chrome extension setup tutorial" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    </div>

    <script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
    <script src="{{ site.baseurl }}/assets/js/smartreply.js"></script>
    <script src="{{ site.baseurl }}/assets/js/tawk-to-chat.js"></script>

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