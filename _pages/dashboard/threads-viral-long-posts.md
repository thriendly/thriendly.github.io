---
layout: dashboard
title: Viral long posts
permalink: /app/viral-threads
---


<style>
    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .template-section,
    .example-section {
        background-color: #e4f5f7;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 15px;
    }

    .example-section {
        background-color: #f5f5f5;
    }

    .content-area {
        white-space: pre-wrap;
        font-family: monospace;
        margin-top: 5px;
    }

    .section-title {
        margin-bottom: 0;
        font-weight: bold;
    }

    .hook-creation {
        display: none;
    }

    .hook-creation .row {
        min-height: 400px;
        column-gap: 20px;
    }

    .hook-creation .col {
        padding: 20px;
        border: 1px solid #dee2e6;
        border-radius: 5px;
    }

    #generatedHook pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        max-width: 100%;
        overflow-x: hidden;
        font-size: 1em;
        line-height: 1.5;
        color: #444;
        background-color: #fff;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .premium-card {
        border: 2px solid #ffc107;
    }
</style>

<body>
    <div id="content" class="container mt-4">
        <h3 class="mb-4 text-primary">Viral long post generator</h3>

        <div id="templatesView">
            <div class="mb-4">
                <h5>Long post thread templates that help you grow faster on Threads</h5>
                <p>Choose a template and create a long form thread with AI in one click. You can edit and submit on
                    threads</p>
            </div>

            <div class="row" id="basicTemplateCards">
                <h4>Basic Templates</h4>
                <!-- Basic template cards will be inserted here -->
            </div>

            <div class="row mt-4" id="premiumTemplateCards">
                <h4>Premium Templates</h4>
                <!-- Premium template cards will be inserted here -->
            </div>

            <div class="row mt-4">
                <div class="col-12 text-center">
                    <h4>Get access to all premium templates!</h4>
                    <p>For faster access and 10x growth tips, join our community or signup for waitlist</p>

                    <a target="_blank" class="btn btn-primary" href="https://discord.gg/7UqWEuqqhk">Join Threads Growth
                        community</a>
                    <a class="btn btn-success" target="_blank" href="https://forms.gle/vat3karHYLDtL1uL9">Join Priority
                        Waitlist</a>
                </div>
            </div>
        </div>

        <div class="hook-creation">
            <button id="backButton" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i> Back to Templates
            </button>
            <h4 class="mb-4">Create long form threads based on example template</h4>
            <p class="mb-4">Just enter a topic and our AI creates content similar to the example shown below</p>
            <div class="row g-2">
                <div class="col" id="templateSection">
                    <h5 id="templateTitle" class="mb-3"></h5>
                    <p id="templateDescription" class="mb-4"></p>

                    <div class="viewpost-section">
                        <a id="templateSectionLink" target="_blank" href="#" class="btn btn-success">View Example Post
                            &nbsp;<i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>

                    <div class="template-section mt-3">
                        <h5 class="section-title">Template:</h5>
                        <div id="templateContent" class="content-area"></div>
                        <input type="hidden" id="instructions" value="" />
                    </div>
                </div>
                <div class="col" id="createHookSection">
                    <h5>Long form viral thread generator</h5>
                    <form id="hookForm">
                        <div class="mb-3">
                            <label for="topic" class="form-label">Your topic</label>
                            <input type="text" class="form-control" id="topic" required
                                placeholder="Eg: 5 tips for viral instagram growth">
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Generate Post &nbsp;<i
                                    class="fa-solid fa-wand-magic-sparkles"></i></button>
                            <img src="/assets/images/tipseason-loading.gif" id="loading" style="display: none;">
                        </div>
                        <div class="mb-3">
                            <p>Note: Each long post generation takes 10 Credits</p>
                        </div>
                    </form>
                    <div id="generatedHook" class="mt-4"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Function to load templates from external URL
        async function loadTemplatesFromAPI() {
            try {
                const response = await fetch('/api/long-form');
                // const responseText = await response.text();
                // console.log("Response as Text:", responseText);

                // Convert the text to JSON if it's valid JSON
                try {
                    const responseBodyJson = await response.json();
                    // console.log("Response as JSON:", responseBodyJson);
                    return responseBodyJson;
                } catch (error) {
                    console.error("Failed to parse JSON:", error);
                }
            } catch (error) {
                console.error('Error loading templates:', error);
                return [];
            }
        }

        // Function to create a card for each template
        function createTemplateCard(template, index, isPremium) {
            return `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 card-hover ${isPremium ? 'premium-card' : ''}" data-index="${index}">
                        <div class="card-body text-center">
                            <i class="${template.icon} fa-3x mb-3 text-primary"></i>
                            <h5 class="card-title">${template.title}</h5>
                            <p class="card-text">${template.description}</p>
                            ${isPremium ? '<span class="badge bg-warning text-dark">Premium</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        let templates = []; // Declare templates array at the top of your script

        // Function to load and display template cards
        async function loadTemplateCards() {
            templates = await loadTemplatesFromAPI();
            const basicCardContainer = $('#basicTemplateCards');
            const premiumCardContainer = $('#premiumTemplateCards');

            templates.forEach((template, index) => {
                if (template.isPremium) {
                    premiumCardContainer.append(createTemplateCard(template, index, true));
                } else {
                    basicCardContainer.append(createTemplateCard(template, index, false));
                }
            });
        }

        // Function to show hook creation form
        function showHookCreation(template) {
            $('#templatesView').hide();
            $('#templateTitle').text(template.title);
            $('#templateDescription').text(template.fullDescription);
            $('#templateSectionLink').attr('href', template.link);
            $('#templateContent').text(template.template);
            $('#instructions').val(template.instructions);
            $('#exampleContent').text(template.example);
            $('.hook-creation').show();
        }

        // Function to show templates view
        function showTemplatesView() {
            $('.hook-creation').hide();
            $('#templatesView').show();
        }

        // Load cards and set up event listeners when the document is ready
        $(document).ready(function () {
            loadTemplateCards();

            // Make entire card clickable
            $(document).on('click', '.card', function () {
                const index = $(this).data('index');
                const isPremium = $(this).hasClass('premium-card');
                if (isPremium) {
                    // Handle premium template access (e.g., show upgrade prompt)
                    alert('This is a premium template. Please upgrade to access.');
                } else {
                    showHookCreation(templates[index]);
                }
            });

            // Handle "Back to Templates" button click
            $('#backButton').on('click', function () {
                const topic = $('#topic').val().trim();
                if (topic) {
                    if (confirm("You have a draft topic. Are you sure you want to go back? Your progress will be lost.")) {
                        showTemplatesView();
                        $('#topic').val('');
                        $('#instructions').val('');
                        $('#generatedHook').empty();
                    }
                } else {
                    showTemplatesView();
                }
            });

            $('#templateSectionLink').on('click', function (e) {
                var href = $(this).attr('href');
                if (href === '#') {
                    e.preventDefault();
                } else {
                    window.open(href, '_blank');
                    e.preventDefault();
                }
            });

            // Handle form submission
            $('#hookForm').on('submit', function (e) {
                e.preventDefault();
                $("#loading").show();
                const topic = $('#topic').val();
                const templateContent = $('#templateContent').html();
                const exampleContent = $('#exampleContent').html();
                const instructions = $('#instructions').val();
                const userId = window.userId || localStorage.getItem('userId');

                // Prepare API parameters
                const apiUrl = 'https://ai.thriendly.com/post-generator';
                const apiParams = {
                    topic: topic,
                    example: exampleContent,
                    template: templateContent,
                    instructions: instructions,
                    userId: userId
                };

                // Call the API
                $.ajax({
                    url: apiUrl,
                    method: 'GET',
                    data: apiParams,
                    success: function (response) {
                        const generatedHook = parseResponse(response) || 'No hook generated.';
                        $('#generatedHook').html(`<h6>Generated Hook:</h6><pre>${generatedHook}</pre>`);
                        $("#loading").hide();
                    },
                    error: function (xhr, status, error) {
                        $('#generatedHook').html(`<h6>Error:</h6><pre>${error}</pre>`);
                        $("#loading").hide();
                    }
                });
            });
        });

        function parseResponse(data) {
            if (data && data.candidates && data.candidates.length > 0) {
                const candidatesRaw = data.candidates[0].content.parts[0].text;
                var candidates = candidatesRaw.replace("```html", "");
                candidates = candidates.replaceAll("*", "");
                finalResponse = candidates.replace("```", "");
                return finalResponse;
            } else {
                if (data && typeof data === 'string' && data.includes("Insufficient Credits")) {
                    return data;
                }
                return "invalid response. try again in sometime!";
            }
        }
    </script>
</body>