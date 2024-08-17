---
layout: dashboard
title: Thriendly Dashboard Home
permalink: /app/home
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
            font-size: 1em;
            line-height: 1.5;
            color: #444;
            background-color: #fff;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>

</head>

<body>
    <div id="content" class="container mt-4">
        <h3 class="mb-4 text-primary">Welcome to Thriendly!</h3>

        <div id="templatesView">
            <div class="mb-4">
                <h5>Thriendly is the fastest way to grow on Threads / X </h5>
            </div>

            <div class="row" id="templateCards">
                <!-- Template cards will be dynamically inserted here -->
            </div>

            <div class="row mt-4">
                <div class="col-12">
                    <div class="callout">
                        Get 200+ free credits and Threads growth 1:1 session free
                        <a target="_blank" href="https://calendly.com/thriendly/thriendly" class="btn btn-warning"
                            id="bookDemo">
                            Book a Demo
                            <i class="fas fa-calendar" style="margin-left:5px"></i>
                        </a>
                    </div>

                    <div>
                        <p class="mt-3">For faster access and 10x growth tips, join our community

                            <a target="_blank" class="btn btn-primary" href="https://discord.gg/7UqWEuqqhk">Threads
                                Growth community</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module">
        import { checkAuthAndExecute } from "{{ site.baseurl }}/assets/js/firebaseauth.js";</script>

    <script>


        // Define the JSON data for thread templates
        const threadTemplates = [
            {
                title: "AI Engagment",
                description: "The secret threads growth weapon to boost your engagement by 10x with Thriendly AI Reply Chrome extension",
                icon: "fa-solid fa-wand-magic-sparkles",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "/app/aireplys"
            },
            {
                title: "Viral Hook templates",
                description: "Craft content that spreads like wildfire with viral thread hooks. Select a template and generate similar hooks by yourself or with AI",
                icon: "fa-solid fa-anchor",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "/app/viral-hooks"
            },
            {
                title: "Long post generator",
                description: "Create long form posts from viral examples to gain massive threads growth. Edit and post to threads. AI powered!",
                icon: "fa-solid fa-pen",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "/app/viral-threads"
            },
            {
                title: "Threads Analytics",
                description: "Critical Threads profile metrics to track and improve your weak / strong areas (Coming Soon)",
                icon: "fa-solid fa-chart-line",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "/app/threads-dashboard"
            },
            {
                title: "Threads Scheduler",
                description: "Compose and schedule your threads post that get delivered even when you sleep! (Coming Soon)",
                icon: "fa-solid fa-calendar",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "/app/threads-scheduler"
            }
        ];

        // Function to create a card for each template
        function createTemplateCard(template, index) {
            return `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 card-hover p-2" data-index="${index}">
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
            // On profile page
            checkAuthAndExecute((user) => {
                // Store user ID globally
                window.userId = user.uid;
                // Or use localStorage
                localStorage.setItem('userId', user.uid);
            });

            loadTemplateCards();

            // Make entire card clickable
            $(document).on('click', '.card', function () {
                const index = $(this).data('index');
                window.location.href = threadTemplates[index].link;
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
                $("#loading").show();
                const topic = $('#topic').val();
                const templateContent = $('#templateContent').html();
                const exampleContent = $('#exampleContent').html();
                const userId = window.userId || localStorage.getItem('userId');

                // Prepare API parameters
                const apiUrl = 'https://ai.thriendly.com/hook-generator';
                const apiParams = {
                    topic: topic,
                    example: exampleContent,
                    template: templateContent,
                    userId: userId
                };

                // Call the API
                $.ajax({
                    url: apiUrl,
                    method: 'GET',
                    data: apiParams,
                    success: function (response) {
                        // Process the response
                        const generatedHook = parseResponse(response) || 'No hook generated.';
                        $('#generatedHook').html(`<h6>Generated Hook:</h6><pre>${generatedHook}</pre>`);
                        $("#loading").hide();
                    },
                    error: function (xhr, status, error) {
                        // Handle errors
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