---
layout: dashboard
title: Thriendly Dashboard - Viral Thread hooks
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
        <h3 class="mb-4 text-primary">Viral Thread hook templates</h3>

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
                    <p>Premium viral templates coming soon!</p>
                    <p>For faster access and 10x growth tips, join our community or signup for waitlist</p>

                    <a target="_blank" class="btn btn-primary" href="https://discord.gg/7UqWEuqqhk">Join Threads
                        Growth community</a>


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
                        <a id="templateSectionLink" target="_blank" href="#" class="btn btn-success">View Post &nbsp;<i
                                class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>
                <div class="col" id="createHookSection">
                    <h5>Create Your Hook</h5>
                    <form id="hookForm">
                        <div class="mb-3">
                            <label for="topic" class="form-label">Your Topic</label>
                            <input type="text" class="form-control" id="topic" required
                                placeholder="Eg: 10 tips for viral instagram growth">
                        </div>
                        <!-- <div class="mb-3">
                            <label for="additionalInfo" class="form-label">Additional Information (optional)</label>
                            <textarea class="form-control" id="additionalInfo" rows="3"></textarea>
                        </div> -->
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Generate Hook &nbsp;<i
                                    class="fa-solid fa-wand-magic-sparkles"></i></button>
                            <img src="/assets/images/tipseason-loading.gif" id="loading" style="display: none;">
                        </div>
                        <div class="mb-3">
                            <p> Note: Each hook generation takes 1 Credit </p>
                        </div>
                    </form>
                    <div id="generatedHook" class="mt-4"></div>
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
                title: "Grab Attention",
                description: "Hook designed to grab users attention. Best suited to increase followers and views",
                icon: "fas fa-eye",
                fullDescription: "This template is designed to quickly capture the audience's attention by highlighting a powerful tool or technology and its potential benefits. It then promises to provide valuable resources or strategies to help users leverage this tool effectively.",
                template: "{Tool/Technology} is a {benefit/advantage}.\nYet people don't know how to {specific action related to the benefit}.\n{X number} of {templates/resources/strategies} that help you {achieve the benefit}.\n({Additional detail about versatility or reuse}) 🧵",
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "https://www.threads.net/@thetipseason/post/C90IUTqSsav"
            },
            {
                title: "Create Suspense",
                description: "Emotional hook to create suspense and making people know the secret",
                icon: "fa-solid fa-user-secret",
                fullDescription: "Emotional hook to create suspense and making people know the secret",
                template: "I shouldn't be sharing this\n\nThey told me to keep it [emotion] 🤐\n\nBut I just can't [action] any longer\n\nMy exact [item] to [achievement] 👇\n\nHint: It's NOT [common solution 1] and NOT [common solution 2]!",
                example: "I shouldn't be sharing this\n\nThey told me to keep it a secret 🤐\n\nBut I just can't stay silent any longer\n\nMy exact formula to grow from 0 to 1300 followers in 6 weeks 👇\n\nHint: Its NOT a book and NOT a course!",
                link: "https://www.threads.net/@thetipseason/post/C-RnnJJxy9F"
            },
            {
                "title": "You don't know this",
                "description": "Reveal the insights from extensive analysis to help your audience understand how to make content go viral.",
                "icon": "fa-solid fa-lightbulb",
                "fullDescription": "This hook provides valuable insights based on extensive analysis of viral content. It promises to share key takeaways that can help your audience achieve viral success.",
                "template": "You don’t understand how to make content go viral yet\n\nBut you will after this 👇🏼\n\n(5 key takeaways from 500+ hours of analyzing viral content)",
                "example": "You don’t understand how to make content go viral yet\n\nBut you will after this 👇🏼\n\n(5 key takeaways from 500+ hours of analyzing viral content)",
                "link": "#"
            },
            {
                "title": "Hype Explosion",
                "description": "Create massive excitement for your product with a dramatic and engaging hook.",
                "icon": "fa-solid fa-explosion",
                "fullDescription": "This hook aims to generate excitement and anticipation by highlighting the groundbreaking nature of the product. It uses energetic language to create a sense of urgency and hype around the launch.",
                "template": "🔥 The countdown is ON! 🔥\n\nIntroducing [product]—the next big thing in [industry/field]!\n\nWhat sets it apart? [unique feature or benefit]\n\nGet ready to witness the future of [industry/field] and grab your [exclusive offer/early access] before it’s gone! 🚀\n\nDon’t miss out on this game-changing launch! 🧵",
                "example": "🔥 The countdown is ON! 🔥\n\nIntroducing ChatGPT Ultra—the next big thing in AI communication!\n\nWhat sets it apart? Seamless integration with all major platforms and unparalleled customization.\n\nGet ready to witness the future of AI and grab your early access discount before it’s gone! 🚀\n\nDon’t miss out on this game-changing launch! 🧵",
                "link": "#"
            },
            {
                "title": "Exclusive Preview",
                "description": "Offer a sneak peek into your product launch to generate buzz and anticipation.",
                "icon": "fa-solid fa-eye",
                "fullDescription": "This hook offers an exclusive preview or behind-the-scenes look at the upcoming product. It builds excitement by giving a glimpse into the product’s features and benefits before the official launch.",
                "template": "👀 Sneak peek alert! 👀\n\nWe’re about to launch [product], and here’s your exclusive first look:\n\n[unique feature or benefit]\n\nGet a behind-the-scenes view and see what makes [product] a must-have in [industry/field] before everyone else does! 🌟\n\nStay tuned for the full reveal and an exclusive offer! 🧵",
                "example": "👀 Sneak peek alert! 👀\n\nWe’re about to launch ChatGPT Ultra, and here’s your exclusive first look:\n\nAdvanced real-time language processing and AI-powered customization.\n\nGet a behind-the-scenes view and see what makes ChatGPT Ultra a must-have in AI technology before everyone else does! 🌟\n\nStay tuned for the full reveal and an exclusive early bird offer! 🧵",
                "link": "#"
            },
            {
                "title": "Unveil a Secret",
                "description": "Create curiosity by revealing a hidden or lesser-known fact.",
                "icon": "fa-solid fa-mask",
                "fullDescription": "This template sparks curiosity by hinting at a secret or surprising fact. It builds anticipation by promising to reveal something that isn’t commonly known or discussed.",
                "template": "Here’s a secret you didn’t know 🤫\n\nMost people think [common misconception]\n\nBut the truth is [reveal or fact]\n\nFind out how this can change your [aspect] 🧵",
                "example": "Here’s a secret you didn’t know 🤫\n\nMost people think that gaining followers is all about posting more\n\nBut the truth is that engagement and consistency are key\n\nFind out how this can change your social media strategy 🧵",
                "link": "#"
            },
            {
                "title": "Shock Value",
                "description": "Use surprising or shocking information to grab attention.",
                "icon": "fa-solid fa-bolt",
                "fullDescription": "This hook is designed to surprise or shock the audience with unexpected information, prompting them to read more to understand the context or learn more.",
                "template": "You won’t believe this...\n\nDid you know [shocking fact or statistic]?\n\nHere’s what this means for you and your [specific aspect] ⬇️",
                "example": "You won’t believe this...\n\nDid you know that 90% of online businesses fail within the first year?\n\nHere’s what this means for you and your startup ⬇️",
                "link": "https://www.threads.net/@thetipseason/post/C-RnnJJxy9F"
            },
            {
                "title": "Urgency Alert",
                "description": "Create a sense of urgency to prompt immediate action.",
                "icon": "fa-solid fa-exclamation-circle",
                "fullDescription": "This hook emphasizes the urgency of taking action now, often highlighting limited availability or time-sensitive offers to encourage immediate responses.",
                "template": "Act now before it’s too late!\n\nOnly [number] spots left for [offer or event]\n\nDon’t miss out on [benefit or reward]—grab your chance before [deadline or condition] ⏳",
                "example": "Act now before it’s too late!\n\nOnly 5 spots left for our exclusive workshop\n\nDon’t miss out on mastering ChatGPT—grab your chance before the end of the week ⏳",
                "link": "#"
            },
            {
                "title": "Challenge Question",
                "description": "Pose a challenging question to engage your audience and provoke thought.",
                "icon": "fa-solid fa-question-circle",
                "fullDescription": "This hook engages the audience by presenting a challenging or thought-provoking question. It encourages readers to think critically and respond, increasing engagement.",
                "template": "Can you answer this?\n\nWhat’s the biggest obstacle you face in [specific area]?\n\nShare your thoughts and discover how others are overcoming similar challenges 🔍",
                "example": "Can you answer this?\n\nWhat’s the biggest obstacle you face in growing your online presence?\n\nShare your thoughts and discover how others are overcoming similar challenges 🔍",
                "link": "#"
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

            $('#templateSectionLink').on('click', function (e) {
                var href = $(this).attr('href');

                // Check if href value is '#'
                if (href === '#') {
                    // Prevent default action for href = '#'
                    e.preventDefault();
                } else {
                    // Open the link in a new tab for other href values
                    window.open(href, '_blank');
                    e.preventDefault(); // Prevent the default link action
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