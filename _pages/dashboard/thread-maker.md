---
layout: dashboard
title: Thriendly Threads Dashboard - Fastest way to grow on threads
permalink: /app/thread-maker
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<style>
    body {
        background-color: #f8f9fa;
    }

    .card {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        margin-bottom: 1rem;
    }

    #generateButton {
        background-color: #28a745;
        border-color: #28a745;
    }

    #generateButton:hover {
        background-color: #218838;
        border-color: #1e7e34;
    }

    #outputArea {
        max-height: 300px;
        overflow-y: auto;
    }

    #templateDisplay {
        white-space: pre-wrap;
    }
</style>

<div id="content">
    <div class="container mt-4 col-md-8">
        <h2 class="mb-4 text-success">Viral Thread Generator</h2>
        <p>Create a long form thread for your own topic similar to the template below</p>

        <div class="row mb-4">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title m-2">Thread Template</h4>
                        <hr>
                        <div id="templateContainer">
                            <p id="templateDisplay" class="m-2"></p>
                        </div>
                        <div class="mt-2">
                            <p class="m-2">...</p>
                            <button id="toggleTemplateBtn" class="btn btn-sm btn-primary ms-2">Show More <i class="fa-solid fa-angles-down"></i></button>
                            <button id="editTemplateBtn" class="btn btn-sm btn-warning">Edit Template <i
                                    class="fa-solid fa-pen-to-square"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Create a thread</h4>
                        <p class="mt-3">A thread will be created similar to template for the topic you want</p>
                        <hr>
                        <form id="threadForm" class="mt-3">
                            <div class="mb-3">
                                <label for="topic" class="form-label">Enter the topic</label>
                                <input type="text" class="form-control" id="topic"
                                    placeholder="Eg: 10 ways to make money online" required>
                            </div>
                            <div class="mb-3">
                                <label for="postCount" class="form-label">Number of Posts in Thread (1 credit per post)</label>
                                <input type="number" class="form-control" id="postCount" min="1" max="10" required
                                    value="5">
                            </div>
                            <button type="submit" class="btn btn-primary" id="generateButton">Generate <i class="fa-solid fa-wand-magic-sparkles"></i></button>
                        </form>


                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-4" id="outputCard" style="display: none;">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Generated Thread Content</h5>
                        <div id="outputArea" class="border p-3 bg-light"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    $(document).ready(function () {
        var fullTemplate = `1/{post_count} 📢 Exciting news about {topic}! Let's dive in. #ThreadStart

2/{post_count} 🔍 Here's what you need to know about {topic}:
• Point 1
• Point 2
• Point 3
#KeepLearning

3/{post_count} 💡 Did you know? An interesting fact about {topic} is...
This could change how we think about it! #DidYouKnow

4/{post_count} 🔮 The future of {topic} looks promising. Experts predict...
What are your thoughts on this? #FutureTrends

5/{post_count} 🎯 Key takeaway: {topic} is crucial because...
Remember to stay informed and keep the conversation going! #ThreadEnd`;

        fullTemplate = `20-year-olds are pocketing $5,000/month with these 3 side hustles.

No initial investment required.

3 under-the-radar methods to make money in 2024 ⬇️

(3rd one is a game-changer)

1. Online Focus Groups:

Participate in online focus groups and market research studies.
Brands pay for your opinions on products and services.

Why It Works:

Companies are eager for consumer insights and are willing to pay well for honest feedback.
This side hustle requires no upfront cost and is flexible with your schedule.

Here’s how to get started ⬇️

... 

What’s next?

Stay tuned for 5 more high-yield side hustles in the next post.

To ensure you don't miss out:

1. Follow me for more money-making insights.
2. Like / Retweet to share these tips with your network.

--- 


`


        function updateTemplateDisplay(template, showFull = false) {
            var lines = template.split('\n');
            var displayedLines = showFull ? lines : lines.slice(0, 10);
            $('#templateDisplay').text(displayedLines.join('\n'));
            $('#toggleTemplateBtn').text(showFull ? 'Hide' : 'Show More');
        }

        updateTemplateDisplay(fullTemplate);

        $('#toggleTemplateBtn').on('click', function () {
            var isShowingMore = $(this).text() === 'Show More';
            updateTemplateDisplay(fullTemplate, isShowingMore);
        });

        $('#editTemplateBtn').on('click', function () {
            var currentTemplate = fullTemplate;
            var textarea = $('<textarea class="form-control" id="templateContent" rows="10"></textarea>');
            textarea.val(currentTemplate);
            $('#templateContainer').html(textarea);
            $(this).text('Save Template').off('click').on('click', saveTemplate);
            $('#toggleTemplateBtn').hide();
        });

        function saveTemplate() {
            fullTemplate = $('#templateContent').val();
            $('#templateContainer').html('<p id="templateDisplay"></p>');
            updateTemplateDisplay(fullTemplate);

            // Change the button text and remove the recursive event binding
            $('#editTemplateBtn')
                .text('Edit Template')
                .off('click') // Remove any previously bound click handlers
                .on('click', function () {
                    var currentTemplate = fullTemplate;
                    var textarea = $('<textarea class="form-control" id="templateContent" rows="10"></textarea>');
                    textarea.val(currentTemplate);
                    $('#templateContainer').html(textarea);
                    $(this).text('Save Template').off('click').on('click', saveTemplate);
                    $('#toggleTemplateBtn').hide();
                });

            $('#toggleTemplateBtn').show().text('Show More');
        }


        $('#threadForm').on('submit', function (e) {
            e.preventDefault();

            var topic = $('#topic').val();
            var postCount = $('#postCount').val();

            // Hardcoded JSON output (simulating API response)
            var hardcodedResponse = {
                thread: generateThread(fullTemplate, topic, postCount)
            };

            displayThreadContent(hardcodedResponse.thread);
        });

        function generateThread(template, topic, postCount) {
            var thread = [];
            var templateLines = template.split('\n\n');
            for (var i = 0; i < Math.min(postCount, templateLines.length); i++) {
                var post = templateLines[i]
                    .replace(/{topic}/g, topic)
                    .replace(/{post_count}/g, postCount);
                thread.push(post);
            }
            return thread;
        }

        function displayThreadContent(thread) {
            var output = '';
            thread.forEach(function (post) {
                output += '<p>' + post + '</p>';
            });
            $('#outputArea').html(output);
            $('#outputCard').show();
        }
    });
</script>