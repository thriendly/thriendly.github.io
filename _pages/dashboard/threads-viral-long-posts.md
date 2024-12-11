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

<body>
    <div id="schedulerContainer" style="display:none;">
    {% include thread-scheduler.html %}
    </div>

    <div id="content" class="container mt-4">
    <div id="GenerationContainer" style="display:block;">
        <h3 class="mb-4 text-primary">Viral long post generator</h3>

        <div id="templatesView">
            <div class="mb-4">
                <h5>Long post thread templates that help you grow faster on Threads</h5>
                <p>Choose a template and create a long form thread with AI in one click. You can edit and submit on
                    threads</p>
            </div>


            <div class="row" id="templateCards">


                <!-- Template cards will be dynamically inserted here -->
            </div>

            <div class="row mt-4">
                <div class="col-12 text-center">
                    <h4>Premium viral templates coming soon!</h4>
                    <p>For faster access and 10x growth tips, join our community or signup for waitlist</p>

                    <a target="_blank" class="btn btn-primary" href="https://www.skool.com/thriendly">Join Threads Growth
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
            <p class="mb-4">Just enter a topic and our AI creates content similar to the example show below</p>
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

                    <!-- <div class="example-section">
                        <h5 class="section-title">Example:</h5>
                        <div id="exampleContent" class="content-area"></div>
                    </div> -->

                </div>
                <div class="col" id="createHookSection">
                    <h5>Long form viral thread generator</h5>
                    <form id="hookForm">
                        <div class="mb-3">
                            <label for="topic" class="form-label">Your topic</label>
                            <input type="text" class="form-control" id="topic" required
                                placeholder="Eg: 5 tips for viral instagram growth">
                        </div>
                        <!-- <div class="mb-3">
                            <label for="additionalInfo" class="form-label">Additional Information (optional)</label>
                            <textarea class="form-control" id="additionalInfo" rows="3"></textarea>
                        </div> -->
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Generate Post &nbsp;<i
                                    class="fa-solid fa-wand-magic-sparkles"></i></button>
                            <img src="/assets/images/tipseason-loading.gif" id="loading" style="display: none;">
                        </div>
                        <button id="loadSchedulerButton" class="btn btn-info" type="button">Open Scheduler</button>
                        <div class="mb-3">
                            <p> Note: Each long post generation takes 10 Credits </p>
                        </div>
                    </form>
                    <div id="generatedHook" class="mt-4"></div>
                </div>
            </div>
        </div>
        </div>
    </div>

    <script type="module" src="{{ site.baseurl }}/assets/js/firebaseauth.js"></script>
    <script type="module">
        import { checkAuthAndExecute } from "{{ site.baseurl }}/assets/js/firebaseauth.js";</script>

    <script>


        // Define the JSON data for thread templates
        const threadTemplates = [
            {
                title: "Viral Listicle",
                description: "Template to create viral list of posts",
                icon: "fas fa-eye",
                fullDescription: "Template to create viral list of posts",
                template: `20 year old kids are making $5,000/month with these 3 hacks.

They are like money printing machines.

3 most underrated niches that can print money in 2024 ⬇️

( 3rd one is my favorite )


>> 

1. Micro-Niche Blogging with Affiliate Marketing:

Create a blog that focuses on a highly specific niche.
Instead of general topics like "fitness," go for "fitness for new mothers" or "fitness for seniors with arthritis."

Why It Works:

Smaller niches have less competition, making it easier to rank in search engines. This targeted audience is more likely to trust your recommendations and convert through affiliate links.

Lets looks at how ⬇

>> 

Steps:

Choose a micro-niche with a passionate audience.

Create high-quality, valuable content regularly.

Use SEO strategies to drive organic traffic.

Monetize through affiliate marketing by recommending relevant products.

But there is one more interesting one ⬇

>> 

2. Print-on-Demand (POD) Services:
Design and sell custom merchandise like T-shirts, mugs, or phone cases using print-on-demand platforms such as Printful, Teespring, or Redbubble.

Why It Works:

There's no need for upfront inventory investment, and the platforms handle
printing, shipping, and customer service.

But how to achieve this ?

>> 

Steps:

Create unique, appealing designs or hire a designer.
Upload your designs to a POD platform and choose products.
Promote your products via social media, email marketing, or a dedicated website.
Earn a profit from each sale without worrying about inventory management.
There is one last thing ⬇

>> 

What’s next ?

We will dive into 5 more high conversion niches in the next post.

To make sure you don't miss

1. Follow me to get guidance to earn your first dollar online
2. Like / Retweet to add value to your followers.

                `,
                example: "ChatGPT is a money making machine.\nYet people don't know how to monetize from it.\n10 ChatGPT master prompt templates that help you make money.\n(Prompts can be reused in multiple niches) 🧵",
                link: "https://www.threads.net/@thetipseason/post/C9h-WNIvOxg"
            },
            {
                "title": "ChatGPT Prompt Generator Thread",
                "description": "Create AI meta prompt listicle based on ChatGPT. This is one of the most useful threads that go viral on Threads / X",
                "icon": "fa-solid fa-wand-magic-sparkles",
                "fullDescription": "Create a list of powerful ChatGPT prompts. This type of content is one of the most popular and viral threads on Threads or X",
                "instructions": "Content of each post should be written as a master template detailed prompt with 2-3 variables for AI tools like ChatGPT / Gemini. The focus should be on creating actionable prompts, not tips or general advice. The output should clearly guide users on how to use the prompts to achieve specific results. Additionally, ensure that the hook in the first post explicitly mentions that the thread is focused on providing these actionable prompts",
                "template": `
YOU have a DIGITAL PRODUCT to sell ! 💪
But you don't know how to make SALES from it 😭
8 ChatGPT / Gemini prompts for 10X digital product sales!
(Save them to sell your stuff ) ⏬
#ThriendlyThread
--- 

1. "Captivating Social Media Ad Copy"

Create scroll-stopping ad copy for [product_name] to be used on [social_media_platform]. Begin with a powerful headline that addresses [main_pain_point] of [target_audience]. Use concise, benefit-driven body text with emojis for visual break. Include a clear value proposition, social proof, and a strong call-to-action. End with an urgency-inducing offer to drive immediate clicks.

⏬

--- 

2. "High-Converting Product Demo Script"
Write a script for a 5-minute product demo of {product_name}, showcasing its {top_feature} to {ideal_customer}. Start with a hook that addresses their main pain point. Walk through the key features, emphasizing benefits at each step. Include 2-3 practical use cases. End with a special offer for demo viewers and a clear next step to purchase.

⏬

--- 

...


8. "Engaging Webinar Pitch Outline"
Develop an outline for a 45-minute webinar to sell {product_name} to {target_audience}. Structure it with: 5 min introduction, 15 min valuable content addressing {main_problem}, 15 min showcasing how {product_name} solves it, 10 min for customer success stories and product demo. Conclude with a compelling 10-minute pitch including a time-sensitive offer and bonus for webinar attendees.

⏬

---
If you are interested to make money online.
1. Follow me
2. Repost / Like this thread.
Most importantly leave a comment of interest to be the first one to be notified.
                `,
                "example": `
YOU have a DIGITAL PRODUCT to sell ! 💪
But you don't know how to make SALES from it 😭
8 ChatGPT / Gemini prompts for 10X digital product sales!
(Save them to sell your stuff ) ⏬
#ThriendlyThread
--- 

1. "Captivating Social Media Ad Copy"

Create scroll-stopping ad copy for [product_name] to be used on [social_media_platform]. Begin with a powerful headline that addresses [main_pain_point] of [target_audience]. Use concise, benefit-driven body text with emojis for visual break. Include a clear value proposition, social proof, and a strong call-to-action. End with an urgency-inducing offer to drive immediate clicks.
⏬

--- 

2. "High-Converting Product Demo Script"
Write a script for a 5-minute product demo of {product_name}, showcasing its {top_feature} to {ideal_customer}. Start with a hook that addresses their main pain point. Walk through the key features, emphasizing benefits at each step. Include 2-3 practical use cases. End with a special offer for demo viewers and a clear next step to purchase.
⏬

--- 

... 


8. "Engaging Webinar Pitch Outline"
Develop an outline for a 45-minute webinar to sell {product_name} to {target_audience}. Structure it with: 5 min introduction, 15 min valuable content addressing {main_problem}, 15 min showcasing how {product_name} solves it, 10 min for customer success stories and product demo. Conclude with a compelling 10-minute pitch including a time-sensitive offer and bonus for webinar attendees.
⏬

---

If you are interested to make money online.
1. Follow me
2. Repost / Like this thread.
Most importantly leave a comment of interest to be the first one to be notified.
                `,
                "link": "https://www.threads.net/@thetipseason/post/C_YQBp5vGkV"
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
                title: "How-To Guide",
                description: "Step-by-step instructions on a specific topic",
                icon: "fas fa-list-ol",
                fullDescription: "Create a comprehensive guide that walks your audience through a process or task. Break down complex topics into easy-to-follow steps, making it simple for readers to implement your advice.",
                template: "1. Introduction: [Brief overview of the topic]\n2. Step 1: [First step]\n3. Step 2: [Second step]\n...\n10. Conclusion: [Summary and final thoughts]",
                example: "How to Start a Successful Blog in 10 Steps\n\n1. Introduction: Starting a blog can be a rewarding experience...\n2. Choose your niche: Decide on a topic you're passionate about...\n3. Select a blogging platform: WordPress, Blogger, or Medium...\n...\n10. Conclusion: By following these steps, you'll be well on your way...",
                link: "#"
            },
            {
                "title": "Curiosity Hook",
                "description": "Engage your audience by piquing their curiosity. \n Create a hook that leaves your audience with unanswered questions, making them eager to read more.",
                "icon": "fa-regular fa-face-surprise",
                "fullDescription": "Create a hook that leaves your audience with unanswered questions, making them eager to read more. Use surprising statistics, facts, or shocking claims to draw them in and compel them to keep reading.",
                "template": `
[Statistic/Percentage] of [Content/Activities] [fail/succeed] to [achieve desired outcome]. 📈
But the [small percentage/elite group] achieve [benefit or result] with [simple action/minimal effort]!
[Number] game-changing SECRETS 🤫 to make your next [content type/action] [explode/grow/achieve a specific outcome]!
(Be prepared for [specific result, e.g., massive success, growth, etc.]) ⬇️

--- 

Secret #1: [Unique Secret Name]

[Brief description of how this secret works, why it's effective, and an actionable tip].
[Optional: Add a brief, relatable example to illustrate the point].

But the next one is much more important ⬇️

--- 
... 

Secret #8: [Micro-Niche Expertise]
Go niche, but go deep.
Focus on a micro-niche that others overlook, and become the go-to expert.
When you're the first to dominate a specific topic, your posts stand out.
Your audience will share because your expertise feels unique and valuable.
Now, let’s spice things up further ⬇️


                `,
                "example": `
99% of THREADS fail to go viral. 📈
But the 1% add hundreds of FOLLOWERS during sleep!
10 game-changing SECRETS 🤫 to make your next thread explode!
(Be prepared for your followers to skyrocket) ⬇️

---

Secret 1 : The Curiosity Hook
Curiosity hooks create viral magic.
Start your thread with an unexpected fact or shocking stat.
Something that forces people to stop scrolling and ask, "Wait, what?"
This is how you reel them in instantly.
Example:
"80% of millionaires are made during recessions. Here's how you can join them…"
But the next one is much more important ⬇️

--- 
... 
                `,
                "link": "https://www.threads.net/@thetipseason/post/C_CpzTsRRG4"
            },
            {
                "title": "Creative Idea Generator Thread",
                "description": "A thread to share creative, actionable,out of the box ideas for a specific topic.",
                "icon": "fa-regular fa-lightbulb",
                "fullDescription": "A thread to share creative, actionable,out of the box ideas for a specific topic.",
                "link": "https://www.threads.net/@thetipseason/post/DAH86KSxCS7",
                "instructions": "Make sure the ideas are creative, actionable, out of the box. If the input has a count make sure to give that count of ideas. If not give 10 ideas. No words like unleash, unlock, tired etc. For the runnign thread indication just give 👇. End the post with a CTA like in the template example",
                "placeholder":"10 ways to make money with canva",
                "template": `
Pinterest is a profit powerhouse 💸

And only few people know how to make money with it.

30 profitable pinterest ideas to earn in 2024.

( Time to make some real money ) 👇
---

1. Create and sell digital products like eBooks or printables.
Pinterest users love downloadable resources that save them time. Create pins to point to your ebooks / printables.

2. Start affiliate marketing by sharing product links.
When people click and buy, you earn a commission. 

3. Offer Pinterest management services.
Many businesses need help creating and scheduling pins.

👇

---

4. Sell your own physical products by linking to your online store.
Pinterest is like a visual catalog for millions of shoppers.

5. Create Pinterest boards for local businesses.
Help small businesses showcase their products and services to a wider audience. Charge them for curating and managing their boards.

6. Teach a Pinterest course.
If you're great at using Pinterest, show others how to succeed.

👇

--- 

...


28. Write case studies showing how businesses can grow with Pinterest.
Charge for these detailed insights.
29. Use Pinterest to grow a community around a specific niche.
Then monetize the community with events, products, or services.
30. Turn your Pinterest expertise into a book.
Sell it directly to your audience or on other platforms.

What's next ? 👇
--- 

In the next post we will talke about Step by step plan to monetize with Threads + Pinterest.
Until then.
1. Follow me.
2. Repost / like the first post to add value to your followers.
                `,
            }

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
            $('#instructions').val(template.instructions);
            $('#exampleContent').text(template.example);

            // Set the placeholder for the topic field with a default value if template.topic is empty
            $('#topic').attr('placeholder', template.placeholder || 'Eg: 5 tips for viral Instagram growth');

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
                $("#userEmail").text(user.email);
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
                        $('#instructions').val('');
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
                const instructions = $('#instructions').val();
                console.log('Instructinos: ' + instructions);
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
            
            const loadSchedulerButton = document.getElementById('loadSchedulerButton');
            if (loadSchedulerButton) {
                loadSchedulerButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Show the scheduler UI
                    document.getElementById("schedulerContainer").style.display = 'block';
                    

                    // Get generated hook from the <pre> inside #generatedHook
                    const preElement = document.querySelector("#generatedHook pre");
                    const generatedHook = preElement ? preElement.innerText : '';

                    // Fill the scheduler textarea
                    const threadContentElement = document.getElementById("threadContent");
                    if (threadContentElement) {
                        threadContentElement.value = generatedHook;
                        updatePreview();
                    }
                    document.getElementById("GenerationContainer").style.display = 'none';
                });
            }
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
    <script src="{{ site.baseurl }}/assets/js/dashboard/threads-scheduler.js"></script>
</body>