$(document).ready(function () {
  let idToken = '';
  let userId = '';
  let selectedThreadsUserId = '';
  let viewsChartInstance;
  let engagementChartInstance;

  let cachedWeeklyInsights = null;
  let cachedMonthlyInsights = null;

  // ADDED: Track current range (monthly or weekly)
  let currentRange = 'monthly';

  // Pill elements
  const pillMonthly = $("#pill-monthly");
  const pillWeekly = $("#pill-weekly");
  const dataTimestampEl = $("#dataTimestamp");

  // ----- EXISITING CODE: SCRAPE BUTTON -----
  $("#scrapeButton").on("click", function () {
      if (!selectedThreadsUserId || selectedThreadsUserId === "demo") {
          alert("Please select a valid profile before scraping insights.");
          return;
      }

      $("#loading").show();
      $("#charts").hide();

      const scrapeURL = new URL(`${SCHEDULER_URL}/insights/scrape`);
      scrapeURL.searchParams.append("userId", userId);
      scrapeURL.searchParams.append("threadsUserId", selectedThreadsUserId);

      fetch(scrapeURL.toString(), {
          headers: {
              Authorization: "Bearer " + idToken
          }
      })
      .then(response => {
          if (response.status === 200) {
              return response.json();
          } else {
              clearDashboard();
              alert("Failed to scrape insights.");
          }
      })
      .then(data => {
          $("#loading").hide();
          clearDashboard(); // Clear old charts before fetching new insights
          fetchAndDisplayInsights();
          $("#charts").show();
      })
      .catch(error => {
          console.error("Error scraping insights:", error);
          alert("An error occurred while scraping insights.");
      });
  });

  // ----- EXISITING CODE: FETCH AND DISPLAY INSIGHTS -----
  function fetchAndDisplayInsights() {
      if (!selectedThreadsUserId || selectedThreadsUserId === "demo") {
          clearDashboard();
          return;
      }

      const insightsURL = new URL(`${SCHEDULER_URL}/insights`);
      insightsURL.searchParams.append("userId", userId);
      insightsURL.searchParams.append("threadsUserId", selectedThreadsUserId);

      fetch(insightsURL.toString(), {
          headers: {
              Authorization: "Bearer " + idToken
          }
      })
      .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            clearDashboard();
            alert("Failed to fetch insights.");
        }
      })
      .then(data => {
        if(data && data.insights){
          // data.insights is expected to have { weekly_insights, monthly_insights }
          const { weekly_insights, monthly_insights } = data.insights;

          // Store them in our cache
          cachedWeeklyInsights = weekly_insights || null;
          cachedMonthlyInsights = monthly_insights || null;

          // Set last-fetched timestamp
          dataTimestampEl.text(new Date().toLocaleString());

          // By default or previously selected range
          updateUI(currentRange);

          $("#loading").hide();
          $("#charts").show();
        } else {
          clearDashboard();
          $("#loading").hide();
          $("#charts").show();
          alert("Unable to get insights for this profile. Please try again later.")
        }
      })
      .catch(error => {
          console.error("Error fetching insights:", error);
          alert("An error occurred while fetching insights data.");
      });
  }

  // ----- EXISITING CODE: CLEAR DASHBOARD -----
  function clearDashboard() {
      $("#followers_countCount").text('-');
      $("#likesCount").text('-');
      $("#repliesCount").text('-');
      $("#repostsCount").text('-');
      if (viewsChartInstance) {
        viewsChartInstance.destroy();
        viewsChartInstance = null;
      }
      if (engagementChartInstance) {
        engagementChartInstance.destroy();
        engagementChartInstance = null;
      }
  }

  // ----- EXISITING CODE: UPDATE METRICS (SINGLE DATASET) -----
  function updateMetrics(apiData) {
      updateMetric("likes", apiData);
      updateMetric("replies", apiData);
      updateMetric("followers_count", apiData);
      updateMetric("reposts", apiData);
      updateMetric("quotes", apiData);
  }

  function updateMetric(metricName, data) {
    const metric = data.data.find((item) => item.name === metricName);
    if (metric) {
      if (metric.total_value && metric.total_value.value !== undefined) {
        $(`#${metricName}Count`).text(metric.total_value.value.toLocaleString());
      }
      // The "trend" elements exist only if you un-comment them in HTML
      const trend = Math.random() > 0.5 ? 5 : -5;
      const trendHtml =
        trend > 0
          ? `<i class="fas fa-arrow-up"></i> ${trend}% from last period`
          : `<i class="fas fa-arrow-down"></i> ${Math.abs(trend)}% from last period`;
      $(`#${metricName}Trend`)
        .html(trendHtml)
        .toggleClass("trend-up", trend > 0)
        .toggleClass("trend-down", trend < 0);
    }
  }

  // ----- EXISITING CODE: CREATE VIEWS CHART (SINGLE DATASET) -----
  function createViewsChart(data) {
    const viewsData = data.data.find((item) => item.name === "views");
    if (viewsData && viewsData.values) {
      const ctx = document.getElementById("viewsChart").getContext("2d");
      if (viewsChartInstance) viewsChartInstance.destroy();
      viewsChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: viewsData.values.map((item) =>
            new Date(item.end_time).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Views",
              data: viewsData.values.map((item) => item.value),
              borderColor: "rgb(33 115 198)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                boxWidth: 0,
                font: { size: 14 },
                color: "#000",
                padding: 5,
              },
            },
          },
        },
      });
    }
  }

  // ----- EXISITING CODE: CREATE ENGAGEMENT CHART (SINGLE DATASET) -----
  function createEngagementChart(data) {
    const likes = data.data.find((item) => item.name === "likes");
    const replies = data.data.find((item) => item.name === "replies");
    const reposts = data.data.find((item) => item.name === "reposts");
    const quotes = data.data.find((item) => item.name === "quotes");

    const engagementData = {
      likes: (likes && likes.total_value) ? likes.total_value.value : 0,
      replies: (replies && replies.total_value) ? replies.total_value.value : 0,
      reposts: (reposts && reposts.total_value) ? reposts.total_value.value : 0,
      quotes: (quotes && quotes.total_value) ? quotes.total_value.value : 0,
    };

    const ctx = document.getElementById("engagementChart").getContext("2d");
    if (engagementChartInstance) engagementChartInstance.destroy();
    engagementChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(engagementData),
        datasets: [
          {
            data: Object.values(engagementData),
            backgroundColor: [
              "#9D1F5C",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  // ----- EXISITING CODE: POPULATE LATEST THREADS (MOCK DATA) -----
  function populateLatestThreads() {
    const mockThreads = [
      {
        title: "Better Threads Dashboard",
        date: "2024/07/03 10:57:54",
        views: 12230,
        likes: 3875,
        reposts: 1829,
        replies: 2873,
        quotes: 1111,
      },
      {
        title: "I like Threads",
        date: "2024/07/03 12:32:21",
        views: 23485,
        likes: 3450,
        reposts: 6823,
        replies: 2348,
        quotes: 2231,
      },
    ];

    const threadsHtml = mockThreads
      .map(
        (thread) => `
        <div class="card mb-3">
          <div class="card-body">
            <h6 class="card-title">${thread.title}</h6>
            <p class="card-text"><small class="text-muted">${thread.date}</small></p>
            <div class="d-flex justify-content-between">
                <span><i class="fas fa-eye"></i> ${thread.views}</span>
                <span><i class="fas fa-heart"></i> ${thread.likes}</span>
                <span><i class="fas fa-retweet"></i> ${thread.reposts}</span>
                <span><i class="fas fa-reply"></i> ${thread.replies}</span>
                <span><i class="fas fa-quote-right"></i> ${thread.quotes}</span>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    $("#latestThreads").html(threadsHtml);
  }

  // ----- EXISITING CODE: AUTH + LOAD PROFILES -----
  checkAuthAndExecute((user) => {
    user.getIdToken().then((token) => {
      idToken = token;
      userId = user.uid;

      const profileAPI = `${SCHEDULER_URL}/threads/profile`;
      const url = new URL(profileAPI);
      url.searchParams.append("userId", userId);

      fetch(url, {
        headers: { Authorization: "Bearer " + idToken }
      })
      .then(response => response.json())
      .then(accounts => {
        const $profileDropdownMenu = $("#profileDropdownMenu");
        $profileDropdownMenu.empty();

        if (Array.isArray(accounts) && accounts.length > 0) {
          accounts.forEach((account, index) => {
            $profileDropdownMenu.append(
              `<li><a class="dropdown-item" href="#" data-value="${account.threadsUserId}">${account.username}</a></li>`
            );
            if (index === 0) {
              $("#profileDropdownButton").text(account.username);
              selectedThreadsUserId = account.threadsUserId;
            }
          });
        } else {
          $profileDropdownMenu.append('<li class="no-profiles">No profiles found.</li>');
          $("#profileDropdownButton").text("Demo");
          selectedThreadsUserId = "demo";
        }

        $profileDropdownMenu.on("click", ".dropdown-item", function () {
          const selectedValue = $(this).data("value");
          const selectedText = $(this).text();
          $("#profileDropdownButton").text(selectedText);
          selectedThreadsUserId = selectedValue;
          clearDashboard();
          fetchAndDisplayInsights();
        });

        clearDashboard();
        fetchAndDisplayInsights();
      })
      .catch(error => {
        console.error("Error fetching profiles:", error);
        alert("An error occurred while fetching Threads profiles.");
      });
    }).catch((error) => {
      console.error("Error getting ID token:", error.message);
    });
  });

  // =====================
  // ADDED: PILL TOGGLE LOGIC
  // =====================
  pillMonthly.on("click", function () {
    currentRange = "monthly";
    pillMonthly.addClass("active");
    pillWeekly.removeClass("active");
    updateUI("monthly");
  });

  pillWeekly.on("click", function () {
    currentRange = "weekly";
    pillWeekly.addClass("active");
    pillMonthly.removeClass("active");
    updateUI("weekly");
  });

  /**
   * Updates the dashboard UI to show either weekly or monthly data,
   * assuming we've cached `cachedWeeklyInsights` and `cachedMonthlyInsights`.
   */
  function updateUI(range) {
    // Pick which data object to use
    let chosenData = range === "weekly" ? cachedWeeklyInsights : cachedMonthlyInsights;
    if (!chosenData) {
      console.log(`No ${range} data available`);
      clearDashboard();
      return;
    }

    // Refresh metrics & charts
    clearDashboard(); // Destroy old charts
    updateMetrics(chosenData);
    createViewsChart(chosenData);
    createEngagementChart(chosenData);
    populateLatestThreads(); // If you want to fetch differently for weekly vs monthly, adjust as needed
  }
});
