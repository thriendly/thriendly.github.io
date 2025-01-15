---
layout: dashboard
title: Thriendly Threads dashboard
permalink: /app/threads/dashboard
---

<div id="content">
  <div class="container mt-4">
    <h3 class="mb-4">Thriendly: Threads Dashboard</h3>

    <!-- SINGLE ROW: Spinner Button (Scrape), Profile Dropdown, Pills, Timestamp -->
        <div class="row mb-3 align-items-center">

        <!-- CHANGED: Moved Profile Dropdown to left column -->
        <div class="col-auto">
            <div class="dropdown">
            <button class="btn btn-success btn-sm dropdown-toggle" type="button" 
                    id="profileDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                Select Profile
            </button>
            <ul class="dropdown-menu" aria-labelledby="profileDropdownButton" id="profileDropdownMenu">
                <li><a class="dropdown-item" href="#" data-value="">Select a profile</a></li>
                <!-- Profile options will be dynamically appended here -->
            </ul>
            </div>
        </div>

        <!-- CHANGED: Right-aligned container for spinner button, pills, and timestamp -->
        <div class="col-auto ms-auto d-flex align-items-center">
            
            <!-- CHANGED: Scrape Button as loading spinner (no text) -->
            <button class="btn btn-primary btn-sm me-3" id="scrapeButton">
                <i class="fas fa-sync-alt"></i> <!-- Normal refresh icon, no animation -->
            </button>

            <!-- Pills for 30 Days vs. 7 Days (small) -->
            <ul class="nav nav-pills me-3" style="font-size: 0.85rem;">
            <li class="nav-item">
                <button class="nav-link active btn-sm px-2 py-1" id="pill-monthly" data-range="monthly">
                30 Days
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link btn-sm px-2 py-1" id="pill-weekly" data-range="weekly">
                7 Days
                </button>
            </li>
            </ul>

            <!-- Timestamp -->
            <small class="text-muted">
            Data last fetched: <span id="dataTimestamp">-</span>
            </small>
        </div>
        </div>


    <!-- Loading Indicator -->
    <div id="loading">
      <img src="/assets/images/tipseason-loading.gif" alt="Loading...">
    </div>

    <div id="charts">
      <div class="row mb-4 mt-3">
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
              <p class="card-text fs-1" id="likesCount">-</p>
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
              <p class="card-text fs-1" id="repliesCount">-</p>
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
</div> 


<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>

<script src="{{ site.baseurl }}/assets/js/dashboard/threads-dashboard.js"></script>
