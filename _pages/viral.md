---
layout: dashboard
title: Threads Post Formatter - Bold, Italic, Strikethrough, script, monospace and more
permalink: /trending-threads
---

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viral Threads Gallery</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        .category-pill {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .category-pill:hover {
            transform: translateY(-2px);
        }
        .category-pill.active {
            background: #0d6efd !important;
            color: white !important;
        }
        .threads-container {
            gap: 20px;
        }
        .thread-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            overflow: hidden;
            width: 100%;
            max-width: 540px;
            margin: 15px;
        }
        .thread-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .load-more-btn {
            background: linear-gradient(45deg, #0d6efd, #0dcaf0);
            border: none;
            transition: all 0.3s ease;
        }
        .load-more-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(13,110,253,0.3);
        }
        .header {
            background: linear-gradient(45deg, #0d6efd, #0dcaf0);
            padding: 2rem 0;
            margin-bottom: 2rem;
            color: white;
        }
        #loading-spinner {
            display: none;
        }
        .error-message {
            display: none;
            color: #dc3545;
            padding: 1rem;
            text-align: center;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1 class="text-center mb-3 animate__animated animate__fadeIn">Viral Threads Gallery</h1>
            <p class="text-center mb-0 animate__animated animate__fadeIn animate__delay-1s">Discover trending conversations across categories</p>
        </div>
    </div>

    <div class="container mb-5">
        <!-- Categories Container -->
        <div id="categories-container" class="categories-container mb-4 animate__animated animate__fadeIn animate__delay-2s">
            <div class="d-flex flex-wrap gap-2 justify-content-center">
                <span class="category-pill active badge rounded-pill bg-light text-dark px-4 py-2" data-category="all">All</span>
                <!-- Categories will be loaded dynamically -->
            </div>
        </div>

        <!-- Loading Spinner -->
        <div id="loading-spinner" class="text-center my-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <!-- Error Message -->
        <div class="error-message" id="error-message">
            Failed to load threads. Please try again later.
        </div>

        <!-- Threads Container -->
        <div class="threads-container d-flex flex-wrap justify-content-center">
            <!-- Threads will be loaded here -->
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-4">
            <button class="load-more-btn btn btn-primary px-5 py-2 rounded-pill">
                Load More
            </button>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
    <script>
        let currentPage = 1;
        const postsPerPage = 10;
        let currentCategory = 'all';
        let threadsData = [];
        let categories = [];

        // Configuration
        const config = {
            dataUrl: '/assets/threads.json',
            categoriesUrl: '/assets/categories.json'
        };

        async function loadCategories() {
            try {
                const response = await fetch(config.categoriesUrl);
                categories = await response.json();
                
                const categoriesContainer = $('.categories-container .d-flex');
                categories.forEach(category => {
                    categoriesContainer.append(`
                        <span class="category-pill badge rounded-pill bg-light text-dark px-4 py-2" 
                              data-category="${category.id}">${category.name}</span>
                    `);
                });
            } catch (error) {
                console.error('Error loading categories:', error);
                $('#error-message').show().text('Failed to load categories');
            }
        }

        async function loadThreadsData() {
            try {
                $('#loading-spinner').show();
                const response = await fetch(config.dataUrl);
                threadsData = await response.json();
                filterAndLoadPosts();
            } catch (error) {
                console.error('Error loading threads:', error);
                $('#error-message').show();
            } finally {
                $('#loading-spinner').hide();
            }
        }

        function getEmbedCode(thread) {
            return `
                <div class="thread-card animate__animated animate__fadeIn">
                    <blockquote class="text-post-media" 
                              data-text-post-permalink="${thread.url}" 
                              data-text-post-version="0" 
                              id="ig-tp-${thread.id}" 
                              style="background:#FFF; border-width: 1px; border-style: solid; border-color: #00000026; border-radius: 16px; max-width:540px; margin: 1px; min-width:270px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
                        <script async src="https://www.threads.net/embed.js"><\/script>
                    </blockquote>
                </div>
            `;
        }

        function filterAndLoadPosts() {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            
            let filteredPosts = threadsData;
            if (currentCategory !== 'all') {
                filteredPosts = threadsData.filter(post => post.category === currentCategory);
            }

            const postsToShow = filteredPosts.slice(startIndex, endIndex);
            
            if (currentPage === 1) {
                $('.threads-container').empty();
            }

            postsToShow.forEach(post => {
                $('.threads-container').append(getEmbedCode(post));
            });

            // Hide load more button if no more posts
            if (endIndex >= filteredPosts.length) {
                $('.load-more-btn').hide();
            } else {
                $('.load-more-btn').show();
            }
        }

        // Event Handlers
        $(document).on('click', '.category-pill', function() {
            $('.category-pill').removeClass('active');
            $(this).addClass('active');
            currentCategory = $(this).data('category');
            currentPage = 1;
            filterAndLoadPosts();
        });

        $('.load-more-btn').click(function() {
            currentPage++;
            filterAndLoadPosts();
        });

        // Initialize
        $(document).ready(function() {
            loadCategories();
            loadThreadsData();
        });
    </script>
</body>