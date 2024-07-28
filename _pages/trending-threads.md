---
layout: dashboard
title: Trending on Threads
permalink: /trending
---

<style>
    body {
        background-color: #f8f9fa;
    }

    .quote-container {
        transition: all 0.3s ease;
    }

    .quote-card {
        height: 100%;
        border: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .quote-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }

    .blockquote {
        font-size: 1rem;
        border-left: 5px solid #007bff;
        padding-left: 1rem;
    }

    .blockquote-footer {
        font-size: 0.9rem;
    }

    .view-toggle {
        cursor: pointer;
    }

    #loading {
        display: none;
        text-align: center;
        padding: 20px;
    }
</style>

<div class="container mt-5">
    <h1 class="text-center mb-4">Beautiful Quote Grid</h1>
    <div class="d-flex justify-content-end mb-3">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary view-toggle" data-view="grid">Grid</button>
            <button type="button" class="btn btn-outline-primary view-toggle" data-view="list">List</button>
        </div>
    </div>
    <div id="quote-grid" class="row g-4"></div>
    <div id="loading">Loading more quotes...</div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script>
    const quotes = [
        { text: "https://www.threads.net/@itsheather_elizabeth/post/C96QgX6RwhR", author: "Steve Jobs" },
        { text: "https://www.threads.net/@zee.thedigitalmom_/post/C96j1aBgF7Y", author: "John Lennon" },
        { text: "https://www.threads.net/@thatfleurgirl/post/C940wN4s7MH", author: "Eleanor Roosevelt" },
        { text: "https://www.threads.net/@flykuzwealth/post/C96TiZQuf2a", author: "Winston Churchill" },
        { text: "https://www.threads.net/@marck.conrado/post/C96lJs6xZ3I", author: "Abraham Lincoln" },
        { text: "https://www.threads.net/@thedevsocial/post/C96ZqBYOtoi", author: "Franklin D. Roosevelt" },
        { text: "https://www.threads.net/@justinalphabet/post/C96OsQRRhqz", author: "Albert Einstein" },
    ];

    let currentView = 'grid';
    let page = 0;
    const quotesPerPage = 6;

    function renderQuote(quote, index) {
        return `
                <div class="quote-container col-12 ${currentView === 'grid' ? 'col-md-6 col-lg-4' : ''}">
                                <blockquote class="text-post-media" data-text-post-permalink="${quote.text}" data-text-post-version="0" id="ig-tp-C95jX8wyzSl" style=" background:#FFF; border-width: 1px; border-style: solid; border-color: #00000026; border-radius: 16px; max-width:540px; margin: 1px; min-width:270px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
   <a href="${quote.text}" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">
      <div style=" padding: 40px; display: flex; flex-direction: column; align-items: center;">
         <div style=" display:block; height:32px; width:32px; padding-bottom:20px;">
            <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg">
               <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
            </svg>
         </div>
         <div style=" font-size: 15px; line-height: 21px; color: #999999; font-weight: 400; padding-bottom: 4px; "> Post by @${quote.author}</div>
         <div style=" font-size: 15px; line-height: 21px; color: #000000; font-weight: 600; "> View on Threads</div>
      </div>
   </a>
</blockquote>
                </div>
            `;
    }

    function loadQuotes() {
        const startIndex = page * quotesPerPage;
        const endIndex = startIndex + quotesPerPage;
        const newQuotes = quotes.slice(startIndex, endIndex);

        if (newQuotes.length > 0) {
            const quoteHTML = newQuotes.map(renderQuote).join('');
            $('#quote-grid').append(quoteHTML);
            page++;
        }

        $('#loading').hide();
    }

    function handleScroll() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('#loading').show();
            setTimeout(loadQuotes, 500); // Simulate loading delay
        }
    }

    $(document).ready(function () {
        loadQuotes();

        $('.view-toggle').on('click', function () {
            currentView = $(this).data('view');
            $('.view-toggle').removeClass('active');
            $(this).addClass('active');

            if (currentView === 'grid') {
                $('.quote-container').removeClass('col-12').addClass('col-md-6 col-lg-4');
            } else {
                $('.quote-container').removeClass('col-md-6 col-lg-4').addClass('col-12');
            }
        });

        $(window).on('scroll', handleScroll);
    });

</script>
<script async src="https://www.threads.net/embed.js"></script>