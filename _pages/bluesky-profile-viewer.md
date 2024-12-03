---
layout: dashboard
title: Bluesky Profile viewer - Profile plc, creation time, followers, insights etc.
permalink: /bluesky-profile-viewer
---

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="Explore Bluesky profiles with our beautiful profile viewer. Search and view detailed Bluesky user information, plc information, followers, insights etc.">
    <meta name="keywords" content="Bluesky, social media, profile viewer, AT Protocol, decentralized social">
    <meta name="author" content="Bluesky Profile Explorer">
    <meta property="og:title" content="Bluesky Profile Explorer">
    <meta property="og:description" content="Beautiful way to explore and analyze Bluesky profiles">
    <meta property="og:type" content="website">
    <title>Bluesky Profile Explorer - Beautiful Profile Analytics</title>
    <style>
        :root {
            --primary-color: #0d6efd;
            --secondary-color: #6c757d;
            --accent-color: #198754;
        }

        body {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            color: #2c3e50;
        }

        .hero-section {
            background: linear-gradient(135deg, var(--primary-color) 0%, #0056b3 100%);
            color: white;
            padding: 4rem 0;
            margin-bottom: 2rem;
            text-align: center;
        }

        .feature-card {
            border: none;
            border-radius: 15px;
            transition: transform 0.3s;
            height: 100%;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .profile-container {
            max-width: 800px;
            margin: 2rem auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .search-container {
            max-width: 600px;
            margin: -3rem auto 2rem;
            position: relative;
            z-index: 100;
        }

        .search-box {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .banner-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .avatar-container {
            margin-top: -75px;
            padding: 0 20px;
        }

        .avatar-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 5px solid white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .stats-container {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
        }

        .stat-item {
            text-align: center;
            padding: 10px;
        }

        .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }

        .description {
            white-space: pre-line;
        }

        .loader {
            display: none;
            text-align: center;
            padding: 20px;
        }

        .tips-section {
            background: white;
            padding: 3rem 0;
            margin: 2rem 0;
        }

        .faq-section {
            padding: 3rem 0;
        }

        footer {
            background: #2c3e50;
            color: white;
            padding: 2rem 0;
            margin-top: 3rem;
        }

        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: none;
            z-index: 1000;
        }
    </style>

    <style>
        /* Enhanced Profile Styles */
        .profile-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }

        .banner-section {
            background: #f8f9fa;
        }

        .avatar-container {
            margin-top: -75px;
            padding: 0 20px;
        }

        .stat-item:hover {
            background-color: rgba(13, 110, 253, 0.05);
            border-radius: 8px;
        }

        .additional-info .card {
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
        }

        .additional-info .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .badge {
            font-size: 0.8rem;
            padding: 0.35em 0.65em;
        }

        #accountFeatures .badge {
            font-weight: normal;
        }

        .pinned-post .card {
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            background-color: #f8f9fa;
        }

        #didBadge {
            font-size: 0.7rem;
            background-color: #6c757d;
        }

        .description {
            white-space: pre-line;
            line-height: 1.6;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
            .avatar-img {
                width: 120px;
                height: 120px;
            }

            .display-name {
                font-size: 1.5rem;
            }

            .profile-content {
                padding: 1rem;
            }
        }
    </style>

</head>

<body>
    <!-- Hero Section -->
    <div class="hero-section">
        <div class="container">
            <h1 class="display-4 mb-4 text-white">Bluesky Profile Viewer / Explorer</h1>
            <p class="lead mb-4">Discover and analyze Bluesky profile insights, plc viewer, preferences and more. </p>
            <p class="mb-0">Join the decentralized social network revolution</p>
        </div>
    </div>

    <!-- Search Container -->
    <div class="container">
        <div class="search-container">
            <div class="search-box">
                <h5 class="text-center mb-4">Enter a Bluesky Handle to Begin</h5>
                <div class="input-group">
                    <input type="text" class="form-control form-control-lg" id="handleInput"
                        placeholder="e.g., thriendly.bsky.social">
                    <button class="btn btn-primary btn-lg" id="searchBtn">
                        <i class="fas fa-search"></i> Search
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading Spinner -->
        <div class="loader">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>


        <div class="profile-container" id="profileContainer" style="display: none;">
            <!-- Profile Header -->
            <div class="banner-section position-relative">
                <img class="banner-img" id="bannerImg" src="" alt="Profile Banner">
                <div class="avatar-container position-absolute start-4 bottom-0 transform-translate">
                    <img class="avatar-img" id="avatarImg" src="" alt="Profile Avatar">
                </div>
            </div>

            <!-- Profile Content -->
            <div class="profile-content p-4 mt-5 bg-light">
                <!-- Profile Header Info -->
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <div class="d-flex align-items-center gap-2">
                            <h2 class="display-name fs-2 fw-bold mb-1" id="displayName"></h2>
                        </div>
                        <p class="handle text-muted mb-2" id="handle"></p>
                        <div class="d-flex gap-3 text-muted small">
                            <div class="join-date">
                                <i class="fas fa-calendar-alt me-1"></i>
                                <span id="joinDate"></span>
                            </div>
                            <div class="created-date">
                                <i class="fas fa-star me-1"></i>
                                <span id="createdDate"></span>
                            </div>
                        </div>
                    </div>
                    <a target="_blank" class="btn btn-outline-primary rounded-pill" id="viewProfileBtn">
                        <i class="fas fa-external-link-alt me-1"></i>
                        View on Bluesky
                    </a>
                </div>

                <!-- Profile Description -->
                <div class="description my-3 text-break" id="description"></div>

                <!-- Profile Stats -->
                <div class="stats-container bg-light rounded-3 p-3 my-4">
                    <div class="row g-3">
                        <div class="col-md-3 col-6">
                            <div class="stat-item text-center">
                                <div class="stat-number fw-bold text-primary mb-1" id="postsCount">0</div>
                                <div class="stat-label text-muted small">Posts</div>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="stat-item text-center">
                                <div class="stat-number fw-bold text-primary mb-1" id="followersCount">0</div>
                                <div class="stat-label text-muted small">Followers</div>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="stat-item text-center">
                                <div class="stat-number fw-bold text-primary mb-1" id="followsCount">0</div>
                                <div class="stat-label text-muted small">Following</div>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="stat-item text-center">
                                <div class="stat-number fw-bold text-primary mb-1" id="listsCount">0</div>
                                <div class="stat-label text-muted small">Lists</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Profile Info -->
                <div class="additional-info mb-4">
                    <h6 class="fw-bold mb-3">Additional Information</h6>
                    Profile plc :  <span class="badge bg-primary" id="didBadge"></span>
                    
                    <div class="row g-3 mt-1">
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-subtitle mb-2 text-muted">Account Type</h6>
                                    <div id="accountFeatures" class="d-flex flex-wrap gap-2">
                                        <!-- Features badges will be added here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-subtitle mb-2 text-muted">Chat Preferences</h6>
                                    <div id="chatPreferences">
                                        <!-- Chat preferences will be shown here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pinned Post -->
                <div class="pinned-post mb-4" id="pinnedPostContainer" style="display: none;">
                    <h6 class="fw-bold mb-3">
                        <i class="fas fa-thumbtack me-2"></i>Pinned Post
                    </h6>
                    <div class="card">
                        <div class="card-body">
                            <div id="pinnedPostContent">
                                <!-- Pinned post content will be added here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Features Section -->
        <div class="row g-4 mb-5">
            <div class="col-md-4">
                <div class="card feature-card">
                    <div class="card-body text-center">
                        <i class="fas fa-chart-line feature-icon"></i>
                        <h5 class="card-title">Profile Analytics</h5>
                        <p class="card-text">Get detailed insights into any Bluesky profile, including follower growth,
                            posting patterns, and engagement metrics.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card feature-card">
                    <div class="card-body text-center">
                        <i class="fas fa-mobile-alt feature-icon"></i>
                        <h5 class="card-title">Mobile Friendly</h5>
                        <p class="card-text">Access profile information on any device with our responsive, user-friendly
                            interface.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card feature-card">
                    <div class="card-body text-center">
                        <i class="fas fa-bolt feature-icon"></i>
                        <h5 class="card-title">Real-time Updates</h5>
                        <p class="card-text">Get the latest profile information instantly with real-time data fetching.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tips Section -->
        <div class="tips-section">
            <div class="container">
                <h2 class="text-center mb-4">Tips for Growing on Bluesky</h2>
                <div class="row g-4">
                    <div class="col-md-6">
                        <h5><i class="fas fa-check-circle text-success"></i> Complete Your Profile</h5>
                        <p>Add a professional profile picture, banner image, and detailed bio to make your profile stand
                            out.</p>
                    </div>
                    <div class="col-md-6">
                        <h5><i class="fas fa-users text-success"></i> Engage with Others</h5>
                        <p>Regularly interact with other users through replies, reposts, and likes to build your
                            network.</p>
                    </div>
                    <div class="col-md-6">
                        <h5><i class="fas fa-hashtag text-success"></i> Use Relevant Topics</h5>
                        <p>Include relevant topics in your posts to help others discover your content.</p>
                    </div>
                    <div class="col-md-6">
                        <h5><i class="fas fa-clock text-success"></i> Post Consistently</h5>
                        <p>Maintain a regular posting schedule to keep your followers engaged.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- FAQ Section -->
        <div class="faq-section">
            <div class="container">
                <h2 class="text-center mb-4">Frequently Asked Questions</h2>
                <div class="accordion" id="faqAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#faq1">
                                What is Bluesky?
                            </button>
                        </h2>
                        <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                <a href="https://bsky.app/">Bluesky</a> is a decentralized social network built on the AT Protocol. It offers users more
                                control over their social media experience through features like portable accounts and
                                customizable feeds.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#faq2">
                                How do I get a Bluesky account?
                            </button>
                        </h2>
                        <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                You can sign up for Bluesky through their mobile app or website. Currently, the platform
                                operates on an invitation system, but you can request an invite through their official
                                channels.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>About Bluesky Profile Explorer</h5>
                    <p>A powerful tool to explore and analyze Bluesky profiles. Get insights, statistics, and more for
                        any Bluesky user.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <h5>Quick Links</h5>
                    <p>
                        <a href="#" class="text-white text-decoration-none">Home</a> |
                        <a href="#" class="text-white text-decoration-none">Features</a> |
                        <a href="#" class="text-white text-decoration-none">FAQ</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button class="btn btn-primary rounded-circle scroll-to-top" id="scrollToTop">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
    <script>
        $(document).ready(function () {
            // Previous profile fetching code remains the same

            // Scroll to Top functionality
            $(window).scroll(function () {
                if ($(this).scrollTop() > 200) {
                    $('.scroll-to-top').fadeIn();
                } else {
                    $('.scroll-to-top').fadeOut();
                }
            });

            $('.scroll-to-top').click(function () {
                $('html, body').animate({ scrollTop: 0 }, 800);
                return false;
            });

            // Search functionality
            $('#searchBtn').click(function () {
                const handle = $('#handleInput').val().trim();
                if (handle) {
                    fetchProfile(handle);
                }
            });

            $('#handleInput').keypress(function (e) {
                if (e.which === 13) {
                    $('#searchBtn').click();
                }
            });

            function fetchProfile(handle) {
                $('.loader').show();
                $('#profileContainer').hide();

                $.ajax({
                    url: `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${handle}`,
                    method: 'GET',
                    success: function (data) {
                        updateProfile(data);
                        $('.loader').hide();
                        $('#profileContainer').show();
                        $('html, body').animate({
                            scrollTop: $('#profileContainer').offset().top - 100
                        }, 800);
                    },
                    error: function (err) {
                        alert('Error fetching profile. Please check the handle and try again.');
                        $('.loader').hide();
                    }
                });
            }


            function updateProfile(data) {
                // Basic Profile Info
                $('#displayName').text(data.displayName || data.handle);
                $('#handle').text('@' + data.handle);
                $('#description').text(data.description || '');
                $('#didBadge').text(data.did);

                // Images
                $('#bannerImg').attr('src', data.banner);
                $('#avatarImg').attr('src', data.avatar);

                // Stats
                $('#postsCount').text(data.postsCount?.toLocaleString() || '0');
                $('#followersCount').text(data.followersCount?.toLocaleString() || '0');
                $('#followsCount').text(data.followsCount?.toLocaleString() || '0');
                $('#listsCount').text(data.associated?.lists?.toLocaleString() || '0');

                // Dates
                if (data.indexedAt) {
                    const indexDate = new Date(data.indexedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    $('#joinDate').text(`Indexed ${indexDate}`);
                }

                if (data.createdAt) {
                    const createDate = new Date(data.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    $('#createdDate').text(`Created ${createDate}`);
                }

                // Account Features
                const features = $('#accountFeatures');
                features.empty();

                if (data.associated?.lists > 0) {
                    features.append(`<span class="badge bg-info">Lists: ${data.associated.lists}</span>`);
                }
                if (data.associated?.feedgens > 0) {
                    features.append(`<span class="badge bg-success">Feed Generators: ${data.associated.feedgens}</span>`);
                }
                if (data.associated?.starterPacks > 0) {
                    features.append(`<span class="badge bg-warning">Starter Packs: ${data.associated.starterPacks}</span>`);
                }
                if (data.associated?.labeler === true) {
                    features.append(`<span class="badge bg-secondary">Labeler</span>`);
                }

                // Chat Preferences
                const chatPrefs = $('#chatPreferences');
                chatPrefs.empty();
                if (data.associated?.chat?.allowIncoming) {
                    const chatStatus = data.associated.chat.allowIncoming === 'all'
                        ? '<i class="fas fa-comments text-success"></i> Open to chat with everyone'
                        : '<i class="fas fa-user-lock text-warning"></i> Limited chat permissions';
                    chatPrefs.append(`<p class="mb-0">${chatStatus}</p>`);
                }

                // Profile Links
                const linksContainer = $('#profileLinks');
                linksContainer.empty();

                // Website
                if (data.associated?.website) {
                    linksContainer.append(`
            <div class="col-auto">
                <a href="${data.associated.website}" target="_blank" class="btn btn-light">
                    <i class="fas fa-globe me-2"></i>${new URL(data.associated.website).hostname}
                </a>
            </div>
        `);
                }

                // Social Links
                const socials = ['twitter', 'github', 'instagram'];
                socials.forEach(platform => {
                    if (data.associated?.[platform]) {
                        linksContainer.append(`
                <div class="col-auto">
                    <a href="https://${platform}.com/${data.associated[platform]}"
                       target="_blank"
                       class="btn btn-light">
                        <i class="fab fa-${platform} me-2"></i>${data.associated[platform]}
                    </a>
                </div>
            `);
                    }
                });

                // Pinned Post
                const pinnedPostContainer = $('#pinnedPostContainer');
                if (data.pinnedPost) {
                    $('#pinnedPostContent').html(`
            <div class="d-flex align-items-center gap-2">
                <i class="fas fa-link text-muted"></i>
                <a href="https://bsky.app/profile/${data.handle}/post/${data.pinnedPost.uri.split('/').pop()}"
                   target="_blank"
                   class="text-decoration-none">
                    View Pinned Post
                </a>
            </div>
        `);
                    pinnedPostContainer.show();
                } else {
                    pinnedPostContainer.hide();
                }

                // View Profile Button
                $('#viewProfileBtn').attr('href', `https://bsky.app/profile/${data.handle}`);
            }


        });


        function updateProfile(data) {
            // Update basic profile information
            $('#displayName').text(data.displayName || data.handle);
            $('#handle').text('@' + data.handle);
            $('#description').text(data.description || '');

            // Update profile images
            $('#bannerImg').attr('src', data.banner);
            $('#avatarImg').attr('src', data.avatar);

            // Update stats
            $('#postsCount').text(data.postsCount?.toLocaleString() || '0');
            $('#followersCount').text(data.followersCount?.toLocaleString() || '0');
            $('#followsCount').text(data.followsCount?.toLocaleString() || '0');

            // Update join date if available
            if (data.indexedAt) {
                const joinDate = new Date(data.indexedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                });
                $('#joinDate').text(`Joined ${joinDate}`);
            }

            // Update profile links
            const linksContainer = $('#profileLinks');
            linksContainer.empty();

            if (data.associated?.website) {
                linksContainer.append(`
            <div class="col-auto">
                <a href="${data.associated.website}" target="_blank" class="btn btn-light">
                    <i class="fas fa-globe me-2"></i>${new URL(data.associated.website).hostname}
                </a>
            </div>
        `);
            }

            // Add other social links if available
            const socials = ['twitter', 'github', 'instagram'];
            socials.forEach(platform => {
                if (data.associated?.[platform]) {
                    linksContainer.append(`
                <div class="col-auto">
                    <a href="https://${platform}.com/${data.associated[platform]}"
                       target="_blank"
                       class="btn btn-light">
                        <i class="fab fa-${platform} me-2"></i>${data.associated[platform]}
                    </a>
                </div>
            `);
                }
            });
        }

    </script>

</body>
