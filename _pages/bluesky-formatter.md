---
layout: dashboard
title: Bluesky Post Formatter - Bold, Italic, Strikethrough, script, monospace and more
permalink: /bluesky-formatter
---

<style>
    /* body {
        background-color: #f0f4f8;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    } */

    /* h1 {
        color: #333;
        font-size: 2.5rem;
        font-weight: 700;
    } */

    #post-content {
        resize: none;
        height: 200px;
        font-family: Arial, sans-serif;
        font-size: 1rem;
        background-color: #ffffff;
        border: 2px solid #dee2e6;
        padding: 15px;
        border-radius: 10px;
        outline: none;
        overflow-y: auto;
    }

    #post-content:focus {
        border-color: #007bff;
    }

    .format-btn {
        margin: 5px;
        width: 40px;
        height: 40px;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    /* .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #004bb1;
    }

    .btn-success {
        background-color: #28a745;
    }

    .btn-success:hover {
        background-color: #218838;
    } */

    /* .card {
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    } */

    .faq-section {
        margin-top: 40px;
    }

    .faq-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .faq-item {
        margin-bottom: 15px;
    }

    .faq-question {
        font-weight: bold;
    }

    .faq-answer {
        margin-top: 5px;
        margin-left: 15px;
    }
</style>

<div class="container mt-5">
    <h1 class="text-center mb-4" style="color:rgb(11 130 154) !important;">Bluesky Post Formatter</h1>
    <h4 class="text-center mb-4">Format your Bluesky posts in bold, italic, underline and more.</h4>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div contenteditable="true" id="post-content" class="form-control mb-3"
                        placeholder="Enter your post here, select and click on formatting buttons below..."></div>
                    <div class="d-flex flex-wrap justify-content-center mb-3">
                        <button class="btn btn-primary format-btn" data-format="b" title="Bold">
                            <i class="fas fa-bold"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="i" title="Italic">
                            <i class="fas fa-italic"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="bi" title="Bold Italic">
                            <i class="fas fa-bold"></i> <i class="fas fa-italic"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="underline" title="Underline">
                            <i class="fas fa-underline"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="strike" title="Strikethrough">
                            <i class="fas fa-strikethrough"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="m" title="Monospace">
                            <i class="fas fa-code"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="c" title="Script">
                            <i class="fas fa-font"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="bc" title="Bold Script">
                            <i class="fas fa-bold"></i> <i class="fas fa-font"></i>
                        </button>
                        <button class="btn btn-primary format-btn" data-format="g" title="Gothic">
                            <i class="fas fa-heading"></i>
                        </button>
                    </div>
                    <button id="copy-btn" class="btn btn-success w-100"><i class="fas fa-copy"></i> Copy to
                        Clipboard</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container faq-section">
    <h2 class="faq-title text-center">Frequently Asked Questions (FAQ)</h2>
    <div class="accordion" id="faqAccordion">
        <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading1">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1"
                    aria-expanded="true" aria-controls="faqCollapse1">
                    What is the Bluesky Post Formatter?
                </button>
            </h2>
            <div id="faqCollapse1" class="accordion-collapse collapse show" aria-labelledby="faqHeading1"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    The Bluesky Post Formatter is a free online tool designed to help users create beautifully styled 
                    posts for the Bluesky app. It allows you to format your text with styles like bold, italic, 
                    underline, and more to make your posts stand out in the decentralized social network.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faqCollapse2" aria-expanded="false" aria-controls="faqCollapse2">
                    How do I use the Bluesky Post Formatter?
                </button>
            </h2>
            <div id="faqCollapse2" class="accordion-collapse collapse" aria-labelledby="faqHeading2"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    Using the Bluesky Post Formatter is simple. Type or paste your text into the input box, select the 
                    portion of text you want to style, and click the desired formatting button (e.g., Bold, Italic, 
                    Underline). The styled text will appear in real-time, ready for you to use on Bluesky.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faqCollapse3" aria-expanded="false" aria-controls="faqCollapse3">
                    Can I copy and paste my formatted text directly to Bluesky?
                </button>
            </h2>
            <div id="faqCollapse3" class="accordion-collapse collapse" aria-labelledby="faqHeading3"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    Yes! Once you’ve applied the desired formatting, click the "Copy to Clipboard" button. The styled 
                    text is automatically copied and can be pasted directly into Bluesky, retaining all the formatting.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading4">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faqCollapse4" aria-expanded="false" aria-controls="faqCollapse4">
                    Is the Bluesky Post Formatter free to use?
                </button>
            </h2>
            <div id="faqCollapse4" class="accordion-collapse collapse" aria-labelledby="faqHeading4"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    Absolutely! The Bluesky Post Formatter is completely free and accessible to everyone. Our goal is 
                    to make it easier for Bluesky users to create eye-catching posts without any cost.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading5">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faqCollapse5" aria-expanded="false" aria-controls="faqCollapse5">
                    What browsers and devices are supported?
                </button>
            </h2>
            <div id="faqCollapse5" class="accordion-collapse collapse" aria-labelledby="faqHeading5"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    The Bluesky Post Formatter is optimized for modern browsers like Google Chrome, Mozilla Firefox, 
                    Safari, and Microsoft Edge. It works seamlessly across devices, including desktops, tablets, 
                    and smartphones, ensuring you can format your posts anytime, anywhere.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading6">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faqCollapse6" aria-expanded="false" aria-controls="faqCollapse6">
                    Do I need to install any software to use this tool?
                </button>
            </h2>
            <div id="faqCollapse6" class="accordion-collapse collapse" aria-labelledby="faqHeading6"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    No installation is required! The Bluesky Post Formatter is entirely web-based. Simply open the 
                    tool in your browser, and you're ready to go. No downloads, no hassles.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading7">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faqCollapse7" aria-expanded="false" aria-controls="faqCollapse7">
                    How can this tool enhance my Bluesky presence?
                </button>
            </h2>
            <div id="faqCollapse7" class="accordion-collapse collapse" aria-labelledby="faqHeading7"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    The Bluesky Post Formatter helps you create visually appealing posts that grab attention. By using 
                    bold headlines, italicized emphasis, and other styles, your posts can stand out in feeds, spark 
                    conversations, and attract more engagement, ultimately boosting your visibility on Bluesky.
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/assets/js/tools/thriendly-pf.js"></script>
<script>
    $(document).ready(function () {
        // Format button click handling
        $('.format-btn').click(function () {
            var format = $(this).data('format');
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            var selectedText = range.toString();

            if (selectedText) {
                var formattedText;
                if (format === 'underline') {
                    formattedText = '<u>' + selectedText + '</u>';
                } else if (format === 'strike') {
                    formattedText = '<s>' + selectedText + '</s>';
                } else {
                    formattedText = toUnicodeVariant(selectedText, format); // Using toUnicodeVariant for special formats
                }

                var span = document.createElement('span');
                span.innerHTML = formattedText;
                range.deleteContents();
                range.insertNode(span);
            }
        });

        // Copy content to clipboard
        $('#copy-btn').click(function () {
            var content = $('#post-content').html();
            var tempElement = $('<div>').html(content);
            tempElement.find('u').contents().unwrap(); // Remove underline tags
            tempElement.find('s').contents().unwrap(); // Remove strikethrough tags
            content = tempElement.text(); // Get only the plain text

            navigator.clipboard.writeText(content).then(function () {
                alert('Copied to clipboard!');
            }, function (err) {
                console.error('Could not copy text: ', err);
            });
        });
    });
</script>
