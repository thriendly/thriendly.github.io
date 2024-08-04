---
layout: dashboard
title: Thriendly Threads Dashboard - Fastest way to grow on threads
permalink: /app/viral-hooks
---

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thriendly Threads Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .template-section,
        .example-section {
            /* background-color: #f8f9fa; */
            background-color: #e4f5f7;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 15px;
        }

        .example-section {
            /* background-color: #0e467d; */
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
        }
    </style>
</head>

<body>
    <div id="content" class="container mt-4">
        <h3 class="mb-4 text-primary">Thriendly Threads Templates</h3>

        <div id="templatesView">
            <div class="mb-4">
                <h5>Viral thread templates that help you grow faster on Threads</h5>
                <p>Just choose a template and ask our AI to create a thread. It does all the magic.</p>
            </div>

            <div class="row" id="templateCards">
                <!-- Template cards will be dynamically inserted here -->
            </div>

            <div class="row mt-4">
                <div class="col-12 text-center">
                    <p>More templates coming soon!</p>
                    <a class="btn btn-success" target="_blank" href="https://forms.gle/vat3karHYLDtL1uL9">Join Priority
                        Waitlist</a>
                </div>
            </div>
        </div>

        <div class="hook-creation">
            <button id="backButton" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i> Back to Templates
            </button>
            <h4 class="mb-4">Create Similar Hook</h4>
            <div class="row g-2">
                <div class="col" id="templateSection">
                    <h5 id="templateTitle" class="mb-3"></h5>
                    <p id="templateDescription" class="mb-4"></p>

                    <div class="template-section">
                        <h5 class="section-title">Template:</h5>
                        <div id="templateContent" class="content-area"></div>
                    </div>

                    <div class="example-section">
                        <h5 class="section-title">Example:</h5>
                        <div id="exampleContent" class="content-area"></div>
                    </div>

                    <div class="viewpost-section">
                        <a id="templateSectionLink" target="_blank" href="#" class="btn btn-success">View Post &nbsp;<i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>
                <div class="col" id="createHookSection">
                    <h5>Create Your Hook</h5>
                    <form id="hookForm">
                        <div class="mb-3">
                            <label for="topic" class="form-label">Your Topic</label>
                            <input type="text" class="form-control" id="topic" required placeholder="Eg: 10 ways to make money online">
                        </div>
                        <div class="mb-3">
                            <label for="additionalInfo" class="form-label">Additional Information (optional)</label>
                            <textarea class="form-control" id="additionalInfo" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Generate Hook &nbsp;<i class="fa-solid fa-wand-magic-sparkles"></i></button>
                    </form>
                    <div id="generatedHook" class="mt-4"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Define the JSON data for thread templates
        const threadTemplates = [
            {
                title: "Grab Attention",
                description: "Hook designed to grab users attention. Best suited to increase followers and views",
                icon: "fas fa-eye",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "https://www.threads.net/@thetipseason/post/C90IUTqSsav"
            },
            {
                title: "How-To Guide",
                description: "Step-by-step instructions on a specific topic",
                icon: "fas fa-list-ol",
                fullDescription: "Create a comprehensive guide that walks your audience through a process or task. Break down complex topics into easy-to-follow steps, making it simple for readers to implement your advice.",
                template: "1. Introduction: [Brief overview of the topic]\n2. Step 1: [First step]\n3. Step 2: [Second step]\n...\n10. Conclusion: [Summary and final thoughts]",
                example: "How to Start a Successful Blog in 10 Steps\n\n1. Introduction: Starting a blog can be a rewarding experience...\n2. Choose your niche: Decide on a topic you're passionate about...\n3. Select a blogging platform: WordPress, Blogger, or Medium...\n...\n10. Conclusion: By following these steps, you'll be well on your way...",
                link: "#"
            },
            // Add more templates here
        ];

        // Function to create a card for each template
        function createTemplateCard(template, index) {
            return `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 card-hover" data-index="${index}">
                        <div class="card-body text-center">
                            <i class="${template.icon} fa-3x mb-3 text-primary"></i>
                            <h5 class="card-title">${template.title}</h5>
                            <p class="card-text">${template.description}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to load and display template cards
        function loadTemplateCards() {
            const cardContainer = $('#templateCards');
            threadTemplates.forEach((template, index) => {
                cardContainer.append(createTemplateCard(template, index));
            });
        }

        // Function to show hook creation form
        function showHookCreation(template) {
            $('#templatesView').hide();
            $('#templateTitle').text(template.title);
            $('#templateDescription').text(template.fullDescription);
            $('#templateSectionLink').attr('href', template.link);
            $('#templateContent').text(template.template);
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
                showHookCreation(threadTemplates[index]);
            });

            // Handle "Back to Templates" button click
            $('#backButton').on('click', function () {
                const topic = $('#topic').val().trim();
                if (topic) {
                    if (confirm("You have a draft topic. Are you sure you want to go back? Your progress will be lost.")) {
                        showTemplatesView();
                        $('#topic').val('');
                        $('#additionalInfo').val('');
                        $('#generatedHook').empty();
                    }
                } else {
                    showTemplatesView();
                }
            });

            // Handle form submission
            $('#hookForm').on('submit', function (e) {
                e.preventDefault();
                const topic = $('#topic').val();
                const additionalInfo = $('#additionalInfo').val();

                // Simulating API call
                setTimeout(() => {
                    const generatedHook = `Generated hook for "${topic}":\n\n${topic} is a game-changer.\nYet people don't know how to leverage it effectively.\n5 strategies that help you maximize ${topic}'s potential.\n(These strategies work across various industries) 🧵`;
                    $('#generatedHook').html(`<h6>Generated Hook:</h6><pre>${generatedHook}Yet people don't know how to leverage it effectively.\nYet people don't know how to leverage it effectively.\nYet people don't know how to leverage it effectively.\nYet people don't know how to leverage it effectively.\nYet people don't know how to leverage it effectively.le don't know how to lele don't know how to lele don't know how to lele don't know how to lele don't know how to le\n</pre>`);
                }, 1);
            });
        });
    </script>
</body>