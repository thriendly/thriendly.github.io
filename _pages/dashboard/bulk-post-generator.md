---
layout: dashboard
title: Bulk AI Generator
permalink: /app/bulk-generator
---

<style>
  .bulk-generator-wrapper {
    max-width: 900px;
    margin: 40px auto;
    padding: 30px;
    border-radius: 16px;
    background: #f9fbfd;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
  }

  .bulk-generator-wrapper h3 {
    font-weight: 700;
    color: #3056d3;
    margin-bottom: 24px;
  }

  .pretty-input,
  .pretty-select {
    border-radius: 12px;
    border: 1px solid #ced4da;
    padding: 14px 16px;
    font-size: 1rem;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .pretty-input:focus,
  .pretty-select:focus {
    outline: none;
    border-color: #3056d3;
    box-shadow: 0 0 0 3px rgba(48, 86, 211, 0.1);
  }

  #bulkLoading {
    width: 30px;
    vertical-align: middle;
  }

  .output-container {
    margin-top: 40px;
  }

  /* Beautified Output Block */
  .output-block {
    background: linear-gradient(120deg, #f5faff 60%, #eaf3ff 100%);
    border-radius: 12px;
    border-left: 4px solid #3056d3;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(48, 86, 211, 0.06), 0 1px 3px rgba(0,0,0,0.03);
    overflow: hidden;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .output-block .output-header {
    cursor: pointer;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(90deg, #e0ebfa 80%, #f5faff 100%);
    border-bottom: 1px solid #d1e3fa;
    font-weight: 600;
    font-size: 1.05rem;
    color: #234;
    user-select: none;
    min-height: 44px;
    letter-spacing: 0.01em;
    transition: background 0.2s;
  }
  .output-block .output-header .toggle-icon {
    font-size: 1.2rem;
    color: #3056d3;
    margin-left: 12px;
    transition: transform 0.2s, color 0.2s;
  }
  .output-block.collapsed .output-header .toggle-icon {
    transform: rotate(-90deg);
    color: #bbb;
  }
  .output-block .output-content {
    padding: 16px 20px;
    background: #fafdff;
    display: block;
    animation: fadeIn 0.2s;
    font-size: 1.01rem;
    line-height: 1.6;
    color: #2a2a2a;
    border-radius: 0 0 12px 12px;
  }
  .output-block.collapsed .output-content {
    display: none;
  }
  .output-block .output-header span:first-child {
    flex: 1;
    white-space: pre-line;
    font-size: 1.01rem;
    color: #234;
  }
  .output-block .output-header:hover,
  .output-block .output-header:focus {
    background: linear-gradient(90deg, #dbe8fa 80%, #f5faff 100%);
    outline: none;
  }
  .output-block .output-header:active {
    background: #e0ebfa;
  }
  .output-block .output-content pre {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    font-size: 1.01rem;
    color: #2a2a2a;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .form-label {
    font-weight: 600;
    color: #444;
    margin-bottom: 8px;
    display: block;
  }
</style>

<div class="container">
  <div class="bulk-generator-wrapper">
    <h3>Bulk AI Thread Generator</h3>
    <div id="bulkInputSection">
      <form id="bulkForm">
        <div class="mb-4">
          <label for="bulkTopics" class="form-label">Topics (one per line):</label>
          <textarea class="pretty-input w-100" id="bulkTopics" rows="6" placeholder="E.g.:
How to grow on Threads
10 ChatGPT hacks for creators" required></textarea>
        </div>

        <div class="mb-4">
          <label for="bulkTemplateSelect" class="form-label">Choose a Template:</label>
          <select class="pretty-select w-100" id="bulkTemplateSelect"></select>
        </div>

        <div class="mb-4">
          <label for="postsPerTopic" class="form-label">Number of posts per topic:</label>
          <input type="number" class="pretty-input w-100" id="postsPerTopic" min="1" max="10" value="1" required>
        </div>

        <div class="mb-4 d-flex align-items-center justify-content-between gap-3">
          <div>
            <button type="submit" class="btn btn-primary">Generate Posts</button>
            <img src="/assets/images/tipseason-loading.gif" id="bulkLoading" style="display:none;">
          </div>
        </div>
      </form>
    </div>
    <div id="bulkOutputSection">
      <div class="d-flex justify-content-end mb-3">
        <button id="downloadBulkResults" class="btn btn-success" style="display:none;" type="button">
          Download All Results
        </button>
      </div>
      <div id="bulkResults" class="output-container"></div>
    </div>

  </div>
</div>

<script>
  const threadTemplates = [
    {
      title: "AI Thread Generator",
      description: "Template to create viral long form thread",
      example: `20 year old kids are making $5,000/month with these 3 hacks.

They are like money printing machines.

3 most underrated niches that can print money in 2024 ⬇️

( 3rd one is my favorite )
---

1. Micro-Niche Blogging with Affiliate Marketing:

Create a blog that focuses on a highly specific niche.
Instead of general topics like "fitness," go for "fitness for new mothers" or "fitness for seniors with arthritis."

Why It Works:

Smaller niches have less competition, making it easier to rank in search engines. This targeted audience is more likely to trust your recommendations and convert through affiliate links.

Lets looks at how ⬇
---
Steps:

Choose a micro-niche with a passionate audience.

Create high-quality, valuable content regularly.

Use SEO strategies to drive organic traffic.

Monetize through affiliate marketing by recommending relevant products.

But there is one more interesting one ⬇
---
2. Print-on-Demand (POD) Services:
Design and sell custom merchandise like T-shirts, mugs, or phone cases using print-on-demand platforms such as Printful, Teespring, or Redbubble.

Why It Works:

There's no need for upfront inventory investment, and the platforms handle
printing, shipping, and customer service.

But how to achieve this ?

---
Steps:

Create unique, appealing designs or hire a designer.
Upload your designs to a POD platform and choose products.
Promote your products via social media, email marketing, or a dedicated website.
Earn a profit from each sale without worrying about inventory management.
There is one last thing ⬇
---

What’s next ?

We will dive into 5 more high conversion niches in the next post.

To make sure you don't miss

1. Follow me to get guidance to earn your first dollar online
2. Like / Retweet to add value to your followers.`,
      instructions: "Content should be actionable and match tone. Strong hook. No AI buzzwords like unleash, unlock, etc. No emojis. Respect count if mentioned.",
      template: `20 year old kids are making $5,000/month with these 3 hacks.

They are like money printing machines.

3 most underrated niches that can print money in 2024 ⬇️

( 3rd one is my favorite )
---

1. Micro-Niche Blogging with Affiliate Marketing:

Create a blog that focuses on a highly specific niche.
Instead of general topics like "fitness," go for "fitness for new mothers" or "fitness for seniors with arthritis."

Why It Works:

Smaller niches have less competition, making it easier to rank in search engines. This targeted audience is more likely to trust your recommendations and convert through affiliate links.

Lets looks at how ⬇
---
Steps:

Choose a micro-niche with a passionate audience.

Create high-quality, valuable content regularly.

Use SEO strategies to drive organic traffic.

Monetize through affiliate marketing by recommending relevant products.

But there is one more interesting one ⬇
---
2. Print-on-Demand (POD) Services:
Design and sell custom merchandise like T-shirts, mugs, or phone cases using print-on-demand platforms such as Printful, Teespring, or Redbubble.

Why It Works:

There's no need for upfront inventory investment, and the platforms handle
printing, shipping, and customer service.

But how to achieve this ?

---
Steps:

Create unique, appealing designs or hire a designer.
Upload your designs to a POD platform and choose products.
Promote your products via social media, email marketing, or a dedicated website.
Earn a profit from each sale without worrying about inventory management.
There is one last thing ⬇
---

What’s next ?

We will dive into 5 more high conversion niches in the next post.

To make sure you don't miss

1. Follow me to get guidance to earn your first dollar online
2. Like / Retweet to add value to your followers.`
    },
    {
      title: "ChatGPT Prompt Generator Thread",
      description: "List of powerful ChatGPT prompts",
      example: `YOU have a DIGITAL PRODUCT to sell ! 💪
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
Most importantly leave a comment of interest to be the first one to be notified.`,
      instructions: "Each post is a master prompt. Avoid general advice. Keep clear structure. Show how to use it.",
      template: `YOU have a DIGITAL PRODUCT to sell ! 💪
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
`
    }
  ];

  function populateTemplateDropdown() {
    const select = document.getElementById('bulkTemplateSelect');
    threadTemplates.forEach((t, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = t.title;
      select.appendChild(option);
    });
  }

  function parseResponse(data) {
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text
        .replace("```html", "")
        .replace("```", "")
        .replaceAll("*", "");
    }
    if (typeof data === 'string' && data.includes("Insufficient Credits")) {
      return data;
    }
    return "Invalid response. Please try again.";
  }

  function getAllResultsText() {
    let text = '';
    $('#bulkResults .output-block').each(function () {
      const topic = $(this).find('h5').text();
      const content = $(this).find('pre').text();
      text += `${topic}\n${content}\n\n----------------------\n\n`;
    });
    return text.trim();
  }

  function downloadResultsAsTxt() {
    const text = getAllResultsText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-ai-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function showDownloadButtonIfResults() {
    if ($('#bulkResults .output-block').length > 0) {
      $('#downloadBulkResults').show();
    } else {
      $('#downloadBulkResults').hide();
    }
  }

  function createOutputBlock(topic, content, postNum, postsPerTopic) {
    const header = `🧠 Topic: ${topic}${postsPerTopic > 1 ? ` (Post ${postNum})` : ''}`;
    // Use a unique id for aria-controls
    const blockId = `output-block-${Math.random().toString(36).substr(2, 9)}`;
    return `
    <div class="output-block" id="${blockId}">
      <div class="output-header" tabindex="0" aria-expanded="true" aria-controls="${blockId}-content">
        <span>${header}</span>
        <span class="toggle-icon">&#9660;</span>
      </div>
      <div class="output-content" id="${blockId}-content">
        <pre>${content}</pre>

      </div>
    </div>

`;
  }

  $(document).ready(function () {
    populateTemplateDropdown();

    $('#bulkForm').on('submit', function (e) {
      e.preventDefault();

      const topics = $('#bulkTopics').val().trim().split('\n').filter(Boolean);
      const selectedTemplate = threadTemplates[$('#bulkTemplateSelect').val()];
      const userId = localStorage.getItem('userId') || '';
      const postsPerTopic = parseInt($('#postsPerTopic').val(), 10) || 1;

      $('#bulkLoading').show();
      $('#bulkResults').html('');
      $('#downloadBulkResults').hide();
      let completed = 0;
      let totalRequests = topics.length * postsPerTopic;

      topics.forEach((topic) => {
        for (let i = 0; i < postsPerTopic; i++) {
          const apiParams = {
            topic: topic,
            template: selectedTemplate.template,
            example: selectedTemplate.example,
            instructions: selectedTemplate.instructions,
            userId: userId
          };

          $.ajax({
            url: 'https://ai.thriendly.com/post-generator',
            method: 'GET',
            data: apiParams,
            success: function (response) {
              const generated = parseResponse(response);
              $('#bulkResults').append(
                createOutputBlock(topic, generated, i + 1, postsPerTopic)
              );
              completed++;
              if (completed === totalRequests) {
                $('#bulkLoading').hide();
                showDownloadButtonIfResults();
              }
            },
            error: function () {
              $('#bulkResults').append(
                createOutputBlock(
                  topic,
                  `<span class="text-danger">❌ Error generating post for: "${topic}"${postsPerTopic > 1 ? ` (Post ${i + 1})` : ''}</span>`,
                  i + 1,
                  postsPerTopic
                )
              );
              completed++;
              if (completed === totalRequests) {
                $('#bulkLoading').hide();
                showDownloadButtonIfResults();
              }
            }
          });
        }
      });

    });

    // Expand/collapse logic
    $(document).on('click keypress', '.output-header', function (e) {
      if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
        const $block = $(this).closest('.output-block');
        const expanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !expanded);
        $block.toggleClass('collapsed');
      }
    });

    $('#downloadBulkResults').on('click', function (e) {
      e.preventDefault();
      downloadResultsAsTxt();
    });
  });
</script>