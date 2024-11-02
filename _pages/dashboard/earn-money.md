---
layout: dashboard
title: Thriendly Shop
permalink: /shop
---

<style>
    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .card-img-top {
        height: 300px;
        object-fit: cover;
    }

    .card-title {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .card-text {
        font-size: 0.9rem;
        color: #6c757d;
    }

    .btn-primary {
        background-color: #0056b3;
        border-color: #0056b3;
    }

    .btn-primary:hover {
        background-color: #004085;
        border-color: #004085;
    }

    .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: #28a745;
    }

    .premium-tag {
        background-color: #ffc107;
        color: #000;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        font-weight: bold;
        margin-left: 0.5rem;
    }

    .credits-tag {
        background-color: #fff5bf;
        color: #000;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        font-weight: bold;
        margin-left: 0.5rem;
        float: right;
    }

    .main-title {
        color: #0056b3;
        font-weight: bold;
    }

    .subtitle {
        color: #6c757d;
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }
</style>

<div id="content" class="container mt-5">

    <div class="row">
        <h1 class="text-center main-title mb-3">Make money with Thriendly!</h1>
        <h3 class="text-center">Buy Once, Sell Forever!</h3>

        <h5 class="text-center mt-2">Earn monthly recurring revenue with our top-selling products, all with master
            resell rights (MRR) included</h5>
        <h6 class="text-center mt-2">Buy them once or access them free with our premium plan &nbsp; &nbsp; <a
                href="/#pricing" class="btn btn-info btn-sm">View plans</a></h6>

        <p class="text-center mb-5 mt-2">MRR allows you to resell the products and keep 100% of the profits life time.
        </p>
    </div>

    <div class="row col-10">
        <div class="alert alert-warning" role="warning">
            Become our affiliate. 40% monthly recurring commision. Limited time offer! <a
                href="https://tipseason.gumroad.com/affiliates">Signup here</a>
        </div>
    </div>

    <div class="row mt-4" id="productCards">
        <!-- Product cards will be dynamically inserted here -->
    </div>

</div>

<!-- jQuery and Bootstrap Bundle (includes Popper) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
    // Define the JSON data for products
    const products = [
        {
            title: "Thriendly Threads: Grow fast and make money on Threads | MRR Rights",
            description: "10X Faster Threads growth and monetization Course + Community | MRR Rights | Go viral on Threads",
            image: "https://public-files.gumroad.com/p8gjtrqn5ctk4gky52rqvasqvo7u",
            link: "https://shop.thriendly.com/l/threads-course",
            price: 19.99,
            credits: "Free with Thriendly Yearly plan",
            offer: "<i class='fa fa-star' aria-hidden='true'></i>"
        },
        {
            title: "7500+ ChatGPT prompts for social media, MRR rights",
            description: "7500+ AI prompts for social media marketing with MRR rights | instagram | threads | tiktok | twitter | facebook | linkedin | pinterest, snapchat,Gemini",
            image: "https://public-files.gumroad.com/ptkppn93jr1spq8q28hvuy1li95j",
            link: "https://tipseason.gumroad.com/l/social-media-chatgpt",
            price: 8.99,
            credits: "1 MRR credit",
            offer: "Free with Premium Plan"
        },
        {
            title: "10,000+ ChatGPT / Gemini Prompts with MRR rights",
            description: "10,000+ ChatGPT, Gemini, any AI Prompts | MRR Rights | 40+ categories | High quality prompts for email marketing, business, social media, coding , teachers, content creators and more..",
            image: "https://public-files.gumroad.com/r00ajc17lc79f2gv3s8kcfl7e98a",
            link: "https://tipseason.gumroad.com/l/odltnd",
            price: 14.99,
            credits: "2 MRR credits",
            offer: "Free with Premium Plan"
        },
        {
            title: "2000+ AI Tools database with MRR rights",
            description: "2000+ AI Tools list (MRR) | Passive income tools resell ideas | Side project tool database | Easy to use tools list | Free, paid",
            image: "https://i.etsystatic.com/41329643/r/il/ea6c27/5812159862/il_1588xN.5812159862_gnxa.jpg",
            link: "https://tipseason.etsy.com/listing/1771099853",
            price: 9.99,
            credits: "1 MRR credit",
            offer: "Free with Premium Plan"
        },
        {
            title: "3000+ AI video generator prompts | MRR Rights",
            description: "5555+ ChatGPT Prompts for etsy sales and make money | Etsy listing generator | Grow your Etsy Shop with expert AI advice | gemini , chatgpt",
            image: "https://public-files.gumroad.com/aulf84rk2y4guaawzwmanww7esx2",
            link: "https://tipseason.gumroad.com/l/svpqi",
            price: 8.99,
            credits: "1 MRR credit",
            offer: "Free with Premium Plan"
        },
        {
            title: "5555+ ChatGPT Prompts for etsy sales and make money | MRR Rights",
            description: "5555+ ChatGPT Prompts for etsy sales and make money | Etsy listing generator | Grow your Etsy Shop with expert AI advice | gemini , chatgpt",
            image: "https://public-files.gumroad.com/2etif4mdl38jzmvq93dtrmpfck95",
            link: "https://tipseason.gumroad.com/l/qgrfm",
            price: 8.99,
            credits: "1 MRR credit",
            offer: "Free with Premium Plan"
        },
    ];

    // Function to create a card for each product
    function createProductCard(product) {
        return `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 card-hover">
                        <a target="_blank" href="${product.link}"><img src="${product.image}" class="card-img-top" alt="${product.title}"></a>
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="price">$${product.price.toFixed(2)}</span>
                                <span class="premium-tag">${product.offer}</span>
                            </div>
                        </div>
                        <div class="card-footer bg-white border-top-0">
                            <a href="${product.link}" class="btn btn-primary btn-block">Buy Now</a>
                            <span class="credits-tag">${product.credits}</span>
                        </div>
                    </div>
                </div>
            `;
    }

    // Function to load and display product cards
    function loadProductCards() {
        const cardContainer = $('#productCards');
        products.forEach((product) => {
            cardContainer.append(createProductCard(product));
        });
    }

    // Load cards when the document is ready
    $(document).ready(function () {
        loadProductCards();
    });
</script>