---
layout: dashboard
title: Thriendly Threads Dashboard - Fastest way to grow on threads
permalink: /app/threads-dashboard
---

<div id="content">
    <div class="container mt-4">
        <h3 class="mb-4">Thriendly: Threads Dashboard</h3>
        <h5 class="mb-4">Coming Soon! Join priority waitlist here <a class="btn btn-success btn-sm" target="_blank"
            href="https://forms.gle/vat3karHYLDtL1uL9">Thriendly Priority Waitlist</a>
            <a target="_blank" class="btn btn-primary btn-sm" href="https://discord.com/invite/kT47PeKz">Join Threads
                    Growth community</a>
            </h5>

        <div class="row mb-4">
            <div class="col-md-3 mb-3">

                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h6 class="card-title">Followers</h6>
                            <i class="fas fa-arrow-trend-up" style="font-size: 1.2rem; color: #000;"></i>
                        </div>
                        <p class="card-text fs-1" id="followers_countCount">-</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h6 class="card-title">Likes</h6>
                            <i class="fas fa-arrow-trend-up" style="font-size: 1.2rem; color: #000;"></i>
                        </div>
                        <p class="card-text  fs-1" id="likesCount">-</p>
                        <!-- <p class="trend" id="likesTrend"></p> -->
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h6 class="card-title">Replies</h6>
                            <i class="fas fa-arrow-trend-up" style="font-size: 1.2rem; color: #000;"></i>
                        </div>
                        <p class="card-text  fs-1" id="repliesCount">-</p>
                        <!-- <p class="trend" id="repliesTrend"></p> -->
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h6 class="card-title">Reposts</h6>
                            <i class="fas fa-arrow-trend-up" style="font-size: 1.2rem; color: #000;"></i>
                        </div>
                        <p class="card-text fs-1" id="repostsCount">-</p>
                        <!-- <p class="trend" id="repostsTrend"></p> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Views Over Time</h5>
                        <canvas id="viewsChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Engagement Distribution</h5>
                        <canvas id="engagementChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card latest-threads">
                    <div class="card-body">
                        <h5 class="card-title">Latest Threads</h5>
                        <div id="latestThreads"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<script src="{{ site.baseurl }}/assets/js/dashboard/threads-dashboard.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
