---
layout: dashboard
title: Thriendly Threads Dashboard - Viral templates
permalink: /app/viral-templates
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<style>
    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
</style>

<div id="content">
    <div class="container mt-4">
        <h3 class="mb-4 text-primary">Thriendly Viral Long Thread Templates</h3>

        <div class="mb-4">
            <h5>Viral thread templates that help you grow faster on Threads</h5>
            <p>Just choose a template and ask our AI to create a thread. It does all the magic.</p>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <h4 class="">Coming soon for premium users!</h4>
                
                <a class="btn btn-success" target="_blank" href="https://forms.gle/vat3karHYLDtL1uL9">Join Priority
                    Waitlist</a>

                <a target="_blank" class="btn btn-primary" href="https://discord.gg/7UqWEuqqhk">Join Threads
                    Growth community</a>

            </div>
        </div>

        <div class="row mt-4" id="templateCards">
            <!-- Template cards will be dynamically inserted here -->
        </div>

        
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
            title: "How-To Guide",
            description: "Step-by-step instructions on a specific topic",
            icon: "fas fa-list-ol"
        },
        {
            title: "Top 10 List",
            description: "Curated list of best items in a category",
            icon: "fas fa-trophy"
        },
        {
            title: "Expert Interview",
            description: "Insights from an industry professional",
            icon: "fas fa-user-tie"
        },
        {
            title: "Myth Busting",
            description: "Debunking common misconceptions",
            icon: "fas fa-ban"
        },
        {
            title: "Case Study",
            description: "In-depth analysis of a specific example",
            icon: "fas fa-search"
        },
        {
            title: "Product Review",
            description: "Detailed evaluation of a product or service",
            icon: "fas fa-star"
        }
    ];

    // Function to create a card for each template
    function createTemplateCard(template) {
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 card-hover">
                    <div class="card-body text-center">
                        <i class="${template.icon} fa-2x mb-3 text-primary"></i>
                        <h5 class="card-title">${template.title}</h5>
                        <p class="card-text">${template.description}</p>
                    </div>
                    <div class="card-footer bg-transparent border-0 text-center">
                        <button class="btn btn-outline-primary btn-sm mb-3">Use Template</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to load and display template cards
    function loadTemplateCards() {
        const cardContainer = $('#templateCards');
        threadTemplates.forEach(template => {
            cardContainer.append(createTemplateCard(template));
        });
    }

    // Load cards when the document is ready
    $(document).ready(function () {
        loadTemplateCards();
    });
</script>

<script type="module">
    import { checkAuthAndExecute } from "{{ site.baseurl }}/assets/js/firebaseauth.js";

    // Your existing script code here
</script>