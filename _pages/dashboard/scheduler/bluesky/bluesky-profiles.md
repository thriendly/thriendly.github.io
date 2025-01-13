---
layout: dashboard
title: Thriendly Connected Accounts
permalink: /app/bluesky/profiles
---

<style>
    .profile-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .profile-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid #dee2e6;
        border-radius: 0.5rem;
        background-color: #fff;
        margin-bottom: 10px;
    }
    .profile-details {
        display: flex;
        align-items: center;
        gap: 10px; /* space between image and username */
    }
    .profile-details .profile-pic {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
    .profile-details .username {
        font-weight: bold;
        font-size: 1.1rem;
    }
    .no-profiles {
        text-align: center;
        color: #6c757d;
        font-size: 1rem;
        padding: 20px;
        border: 1px dashed #dee2e6;
        border-radius: 0.5rem;
        background-color: #f8f9fa;
    }
    .profile-actions {
        display: flex;
        gap: 10px;
    }
    .delete-button, .set-default-button {
        font-size: 0.9rem;
    }
    .delete-button {
        background-color: #dc3545; 
        color: #fff; 
        border: none; 
        padding: 6px 12px; 
        border-radius: 4px; 
        cursor: pointer;
    }
    .delete-button:hover {
        background-color: #c82333;
    }
    .badge.bg-success {
        font-size: 0.8rem;
    }
    #connectBlueskyButton {
        color: #fff; 
        background-color: #198755; 
        border: none; 
        padding: 10px 20px;
        font-size: 1rem; 
        border-radius: 4px; 
        cursor: pointer; 
        margin-bottom: 20px;
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

<!-- Hidden template item (cloned in JS) -->
<ul style="display: none;">
    <li class="profile-item" id="blueskyProfileTemplate">
        <div class="profile-details">
            <img class="profile-pic" src="/assets/images/default-profile.png" alt="Profile Picture">
            <div>
                <div class="username"></div>
                <div class="badge bg-success mt-1 default-badge" style="display:none;">Default</div>
            </div>
        </div>
        <div class="profile-actions">
            <button class="btn btn-secondary set-default-button">Set Default</button>
            <button class="delete-button btn btn-danger">Delete</button>
        </div>
    </li>
</ul>

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
            <label for="blueskyPassword" class="form-label">Bluesky App Password</label><br>
            <small>Create an app-password using this link,  <a href="https://bsky.app/settings/app-passwords" target="_blank">bluesky app-password.</a></small>
            <input type="password" class="form-control" id="blueskyPassword" required>
          </div>
        </form>
        <div class="mb-3">
        </div>
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
<!-- Our main JS -->
<script src="{{ site.baseurl }}/assets/js/dashboard/bluesky/bluesky-profiles.js"></script>
