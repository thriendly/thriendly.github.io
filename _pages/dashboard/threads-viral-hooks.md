---
layout: dashboard
title: Thriendly Threads Dashboard - Fastest way to grow on threads
permalink: /app/viral-hooks
---

<html lang="en">
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
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1000;
        }
        .overlay-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            max-width: 80%;
            max-height: 80%;
            overflow-y: auto;
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            cursor: pointer;
        }
        .template-section, .example-section {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        .example-section {
            background-color: #e9ecef;
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
    </style>
</head>
<body>
    <div id="content">
        <div class="container mt-4">
            <h3 class="mb-4 text-primary">Thriendly Threads Templates</h3>
            
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
                    <a class="btn btn-success" target="_blank" href="https://forms.gle/vat3karHYLDtL1uL9">Join Priority Waitlist</a>
                </div>
            </div>
        </div>
    </div>

    <div id="overlay" class="overlay">
        <div class="overlay-content">
            <span class="close-btn">&times;</span>
            <h4 id="overlayTitle" class="mb-3"></h4>
            <p id="overlayDescription" class="mb-4"></p>
            
            <div class="template-section">
                <h5 class="section-title">Template:</h5>
                <div id="templateContent" class="content-area"></div>
            </div>
            
            <div class="example-section">
                <h5 class="section-title">Example:</h5>
                <div id="exampleContent" class="content-area"></div>
            </div>
            
            <button id="useTemplateBtn" class="btn btn-primary">Create Similar Hook &nbsp;<i class="fa-solid fa-wand-magic-sparkles"></i></button>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
    <script src="{{ site.baseurl }}/assets/js/smartreply.js"></script>
    <script>
        // Define the JSON data for thread templates
        const threadTemplates = [
            {
                title: "Grab Attention",
                description: "Hook designed to grab users attention. Best suited to increase followers and views",
                icon: "fas fa-eye",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵"
            },
            {
                title: "How-To Guide",
                description: "Step-by-step instructions on a specific topic",
                icon: "fas fa-list-ol",
                fullDescription: "Create a comprehensive guide that walks your audience through a process or task. Break down complex topics into easy-to-follow steps, making it simple for readers to implement your advice.",
                template: "1. Introduction: [Brief overview of the topic]\n2. Step 1: [First step]\n3. Step 2: [Second step]\n...\n10. Conclusion: [Summary and final thoughts]",
                example: "How to Start a Successful Blog in 10 Steps\n\n1. Introduction: Starting a blog can be a rewarding experience...\n2. Choose your niche: Decide on a topic you're passionate about...\n3. Select a blogging platform: WordPress, Blogger, or Medium...\n...\n10. Conclusion: By following these steps, you'll be well on your way..."
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

        // Function to show overlay with template details
        function showOverlay(template) {
            $('#overlayTitle').text(template.title);
            $('#overlayDescription').text(template.fullDescription);
            $('#templateContent').text(template.template);
            $('#exampleContent').text(template.example);
            $('#overlay').fadeIn();
        }

        // Load cards and set up event listeners when the document is ready
        $(document).ready(function() {
            loadTemplateCards();

            // Make entire card clickable
            $(document).on('click', '.card', function() {
                const index = $(this).data('index');
                showOverlay(threadTemplates[index]);
            });

            // Close overlay when clicking the close button or outside the content
            $('.close-btn, .overlay').on('click', function(e) {
                if (e.target === this) {
                    $('#overlay').fadeOut();
                }
            });

            // Prevent closing when clicking inside the overlay content
            $('.overlay-content').on('click', function(e) {
                e.stopPropagation();
            });

            // Handle "Use Template" button click
            $('#useTemplateBtn').on('click', function() {
                // Add your logic for using the template here
                alert('Template usage logic goes here. You can now create a similar hook based on this template.');
                $('#overlay').fadeOut();
            });
        });
    </script>

    <script type="module">
        import { checkAuthAndExecute } from "{{ site.baseurl }}/assets/js/firebaseauth.js";

        // Your existing script code here
    </script>
</body>
</html>