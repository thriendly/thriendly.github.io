---
layout: dashboard
title: Thriendly Connected Accounts
permalink: /app/bluesky/profiles
---

<style>
    /* Shared styles for profile list UI */
    .profile-list {
        list-style: none; padding: 0; margin: 0;
    }
    .profile-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px; border: 1px solid #dee2e6; border-radius: 0.5rem; background-color: #fff;
        margin-bottom: 10px;
    }
    .profile-details .username {
        font-weight: bold; font-size: 1.1rem;
    }
    .delete-button {
        background-color: #dc3545; border: none; color: #fff; padding: 6px 12px;
        border-radius: 4px; cursor: pointer; font-size: 0.9rem;
    }
    .delete-button:hover {
        background-color: #c82333;
    }
    .no-profiles {
        text-align: center; color: #6c757d; font-size: 1rem; padding: 20px;
        border: 1px dashed #dee2e6; border-radius: 0.5rem; background-color: #f8f9fa;
    }
    #connectBlueskyButton {
        color: #fff; background-color: #198755; border: none; padding: 10px 20px;
        font-size: 1rem; border-radius: 4px; cursor: pointer; margin-bottom: 20px;
    }
</style>

<div id="content" class="container mt-4">
    <h3 class="mb-4 text-primary">Thriendly Bluesky Scheduler</h3>

    <!-- Connect Bluesky Account Button -->
    <button id="connectBlueskyButton">Connect Bluesky Account</button>

    <!-- Loading Icon -->
    <div id="loading" style="display: none; text-align:center;">
        <img src="/assets/images/tipseason-loading.gif" alt="Loading..." width="50" height="50">
    </div>

    <!-- Profiles List -->
    <ul class="profile-list" id="profileList"></ul>
</div>

<!-- Modal for adding Bluesky account -->
<div class="modal fade" id="blueskyModal" tabindex="-1" aria-labelledby="blueskyModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="blueskyModalLabel">Connect Bluesky Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="blueskyForm">
          <div class="mb-3">
            <label for="blueskyUsername" class="form-label">Bluesky Username</label>
            <input type="text" class="form-control" id="blueskyUsername" required>
          </div>
          <div class="mb-3">
            <label for="blueskyPassword" class="form-label">Bluesky App Password</label>
            <input type="password" class="form-control" id="blueskyPassword" required>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="saveBlueskyAccount">Save</button>
      </div>
    </div>
  </div>
</div>

<script>const SCHEDULER_URL = '{{ site.schedulerService }}';</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
<script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>

<script src="{{ site.baseurl }}/assets/js/dashboard/bluesky/bluesky-profiles.js"></script>
<!-- Bootstrap CSS -->
