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
    background: #f8f8f9;
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

  #templateGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  .template-card {
    border-radius: 12px;
    border: 2px solid #e0e7ef;
    background: #fafdff;
    box-shadow: 0 2px 12px rgba(48,86,211,0.07);
    padding: 1.2rem 1.2rem 1rem 1.2rem;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
    position: relative;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .template-card.selected, .template-card:hover {
    border-color: #3056d3;
    box-shadow: 0 4px 18px rgba(48,86,211,0.13);
    background: #f0f6ff;
  }
  .template-card .template-icon {
    font-size: 2.2rem;
    color: #3056d3;
    margin-bottom: 0.5rem;
  }
  .template-card .template-title {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #234;
  }
  .template-card .template-desc {
    font-size: 0.98rem;
    color: #444;
    margin-bottom: 0.7rem;
    min-height: 48px;
  }
  .template-card .template-preview, .template-card .template-example {
    background: #f5f7fa;
    border-radius: 7px;
    padding: 0.7rem;
    font-size: 0.97rem;
    color: #2a2a2a;
    margin-bottom: 0.5rem;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 90px;
    overflow-y: auto;
  }
  .template-card .template-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #3056d3;
    margin-bottom: 0.2rem;
    margin-top: 0.5rem;
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
          <label class="form-label">Choose a Template:</label>
          <div class="d-flex align-items-center gap-2">
            <input type="text" id="selectedTemplateName" class="form-control" readonly style="max-width:300px;" placeholder="No template selected">
            <button type="button" class="btn btn-outline-primary" id="openTemplateModal">
              <i class="fa-solid fa-layer-group"></i> Browse Templates
            </button>
          </div>
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

<!-- Template Selection Modal -->
<div class="modal fade" id="templateModal" tabindex="-1" aria-labelledby="templateModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="templateModalLabel"><i class="fa-solid fa-layer-group"></i> Select a Post Template</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style="max-height:70vh;overflow-y:auto;">
        <div class="row g-4" id="templateGrid"></div>
      </div>
      <div class="modal-footer">
        <button id="confirmTemplateBtn" class="btn btn-success" disabled>Select Template</button>
      </div>
    </div>
  </div>
</div>

<script>
// Load templates from a separate JSON file
let threadTemplates = [];

function loadTemplatesFromJson(callback) {
  $.getJSON('/assets/data/templates.json', function(data) {
    threadTemplates = data;
    if (typeof callback === 'function') callback();
  }).fail(function() {
    alert('Failed to load templates. Please try again later.');
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
  // Load templates first, then enable UI
  loadTemplatesFromJson(function() {

    $('#bulkForm').on('submit', function (e) {
      e.preventDefault();

      const topics = $('#bulkTopics').val().trim().split('\n').filter(Boolean);
      const selectedTemplateTitle = $('#selectedTemplateName').val();
      const selectedTemplate = threadTemplates.find(t => t.title === selectedTemplateTitle);
      const userId = localStorage.getItem('userId') || '';
      const postsPerTopic = parseInt($('#postsPerTopic').val(), 10) || 1;

      if (!selectedTemplate) {
        alert('Please select a template.');
        return;
      }

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

    let selectedTemplateIndex = null;

    // Render templates in modal
    function renderTemplateGrid() {
      const grid = document.getElementById('templateGrid');
      grid.innerHTML = '';
      threadTemplates.forEach((tpl, idx) => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.setAttribute('data-index', idx);

        card.innerHTML = `
          <div class="template-icon"><i class="${tpl.icon || 'fa-solid fa-layer-group'}"></i></div>
          <div class="template-title">${tpl.title}</div>
          <div class="template-desc">${tpl.description || tpl.fullDescription || ''}</div>
          <div class="template-label">Preview</div>
          <div class="template-preview">${tpl.template ? tpl.template.slice(0, 180) + (tpl.template.length > 180 ? '...' : '') : ''}</div>
          <div class="template-label">Example</div>
          <div class="template-example">${tpl.example ? tpl.example.slice(0, 120) + (tpl.example.length > 120 ? '...' : '') : ''}</div>
        `;
        card.onclick = function() {
          document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          selectedTemplateIndex = idx;
          document.getElementById('confirmTemplateBtn').disabled = false;
        };
        grid.appendChild(card);
      });
    }

    // Open modal on button click
    document.getElementById('openTemplateModal').onclick = function() {
      renderTemplateGrid();
      selectedTemplateIndex = null;
      document.getElementById('confirmTemplateBtn').disabled = true;
      // Show modal (Bootstrap 5)
      const modal = new bootstrap.Modal(document.getElementById('templateModal'));
      modal.show();
    };

    // Confirm selection
    document.getElementById('confirmTemplateBtn').onclick = function() {
      if (selectedTemplateIndex !== null) {
        const tpl = threadTemplates[selectedTemplateIndex];
        document.getElementById('selectedTemplateName').value = tpl.title;
        bootstrap.Modal.getInstance(document.getElementById('templateModal')).hide();
      }
    };

  }); // end loadTemplatesFromJson
});
</script>