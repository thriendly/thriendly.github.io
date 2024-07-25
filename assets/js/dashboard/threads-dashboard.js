$(document).ready(function () {
  // Simulating API call with the provided sample data
  const apiData = {
    data: [
      {
        name: "likes",
        period: "day",
        title: "likes",
        description: "The number of likes on your posts.",
        total_value: {
          value: 1113,
        },
        id: "17841453187567853/insights/likes/day",
      },
      {
        name: "replies",
        period: "day",
        title: "replies",
        description: "The number of replies on your posts.",
        total_value: {
          value: 421,
        },
        id: "17841453187567853/insights/replies/day",
      },
      {
        name: "followers_count",
        period: "day",
        title: "followers_count",
        description: "This is your total number of followers on Threads.",
        total_value: {
          value: 458,
        },
        id: "17841453187567853/insights/followers_count/day",
      },
      {
        name: "reposts",
        period: "day",
        title: "reposts",
        description: "The number of times your posts were reposted.",
        total_value: {
          value: 78,
        },
        id: "17841453187567853/insights/reposts/day",
      },
      {
        name: "views",
        period: "day",
        values: [
          {
            value: 225,
            end_time: "2024-06-30T07:00:00+0000",
          },
          {
            value: 1110,
            end_time: "2024-07-01T07:00:00+0000",
          },
          {
            value: 25324,
            end_time: "2024-07-02T07:00:00+0000",
          },
          {
            value: 26131,
            end_time: "2024-07-03T07:00:00+0000",
          },
          {
            value: 116,
            end_time: "2024-07-04T07:00:00+0000",
          },
          {
            value: 28,
            end_time: "2024-07-05T07:00:00+0000",
          },
          {
            value: 35,
            end_time: "2024-07-06T07:00:00+0000",
          },
          {
            value: 118,
            end_time: "2024-07-07T07:00:00+0000",
          },
          {
            value: 139,
            end_time: "2024-07-08T07:00:00+0000",
          },
          {
            value: 493,
            end_time: "2024-07-09T07:00:00+0000",
          },
          {
            value: 6432,
            end_time: "2024-07-10T07:00:00+0000",
          },
          {
            value: 3244,
            end_time: "2024-07-11T07:00:00+0000",
          },
          {
            value: 7308,
            end_time: "2024-07-12T07:00:00+0000",
          },
          {
            value: 1399,
            end_time: "2024-07-13T07:00:00+0000",
          },
          {
            value: 214,
            end_time: "2024-07-14T07:00:00+0000",
          },
          {
            value: 724,
            end_time: "2024-07-15T07:00:00+0000",
          },
          {
            value: 1285,
            end_time: "2024-07-16T07:00:00+0000",
          },
          {
            value: 33684,
            end_time: "2024-07-17T07:00:00+0000",
          },
          {
            value: 23575,
            end_time: "2024-07-18T07:00:00+0000",
          },
          {
            value: 9248,
            end_time: "2024-07-19T07:00:00+0000",
          },
          {
            value: 14503,
            end_time: "2024-07-20T07:00:00+0000",
          },
          {
            value: 29823,
            end_time: "2024-07-21T07:00:00+0000",
          },
          {
            value: 6637,
            end_time: "2024-07-22T07:00:00+0000",
          },
          {
            value: 1610,
            end_time: "2024-07-23T07:00:00+0000",
          },
        ],
        title: "views",
        description: "The number of times your profile was viewed.",
        id: "17841453187567853/insights/views/day",
      },
      {
        name: "quotes",
        period: "day",
        title: "quotes",
        description: "The number of times your posts were quoted.",
        total_value: {
          value: 4,
        },
        id: "17841453187567853/insights/quotes/day",
      },
    ],
    paging: {
      previous:
        "https://graph.threads.net/v1.0/17841463126859639/threads_insights?access_token=THQWJWSnJEMENpZAU1hc0c0bF9hbHBLR05VdVI3M2RjUnUweXAtZAnFoMTdnamUteTlwV043TldLRFdYbVYxcndadUJjYWJ2M043eU5JcTdEN29LVWxTS3E2NGpwNm5xRGZAXYnppOURDMFpWdTdybUktcVVfQ2hSZAGZAKbXcZD&since=1717804799&until=1719791999&metric=likes%2Creplies%2Cfollowers_count%2Creposts%2Cviews%2Cquotes",
      next: "https://graph.threads.net/v1.0/17841463126859639/threads_insights?access_token=THQWJWSnJEMENpZAU1hc0c0bF9hbHBLR05VdVI3M2RjUnUweXAtZAnFoMTdnamUteTlwV043TldLRFdYbVYxcndadUJjYWJ2M043eU5JcTdEN29LVWxTS3E2NGpwNm5xRGZAXYnppOURDMFpWdTdybUktcVVfQ2hSZAGZAKbXcZD&since=1721779201&until=1723766401&metric=likes%2Creplies%2Cfollowers_count%2Creposts%2Cviews%2Cquotes",
    },
  };

  // Update metrics
  updateMetric("likes", apiData);
  updateMetric("replies", apiData);
  updateMetric("followers_count", apiData);
  updateMetric("reposts", apiData);
  updateMetric("quotes", apiData);

  // Create views chart
  createViewsChart(apiData);

  // Create engagement distribution chart
  createEngagementChart(apiData);

  // Populate latest threads (mock data)
  populateLatestThreads();
});

function updateMetric(metricName, data) {
  const metric = data.data.find((item) => item.name === metricName);
  if (metric) {
    $(`#${metricName}Count`).text(metric.total_value.value.toLocaleString());
    // Mock trend data
    const trend = Math.random() > 0.5 ? 5 : -5;
    const trendHtml =
      trend > 0
        ? `<i class="fas fa-arrow-up"></i> ${trend}% from last period`
        : `<i class="fas fa-arrow-down"></i> ${Math.abs(
            trend
          )}% from last period`;
    $(`#${metricName}Trend`)
      .html(trendHtml)
      .toggleClass("trend-up", trend > 0)
      .toggleClass("trend-down", trend < 0);
  }
}

function createViewsChart(data) {
  const viewsData = data.data.find((item) => item.name === "views");
  if (viewsData) {
    const ctx = document.getElementById("viewsChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: viewsData.values.map((item) =>
          new Date(item.end_time).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Views",
            data: viewsData.values.map((item) => item.value),
            // borderColor: 'rgb(75, 192, 192)',
            borderColor: "rgb(33 115 198)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 0, // Remove the box width
              font: {
                size: 14, // Adjust the font size as needed
              },
              color: "#000", // Set the label color
              padding: 5, // Adjust padding as needed
            },
          },
          datalabels: {
            color: "#000", // Set the data label color
            font: {
              weight: "bold",
              size: 14, // Adjust the font size as needed
            },
            formatter: (value, context) => {
              return value; // Return the value to be displayed
            },
          },
        },
      },
    });
  }
}

function createEngagementChart(data) {
  const engagementData = {
    likes: data.data.find((item) => item.name === "likes").total_value.value,
    replies: data.data.find((item) => item.name === "replies").total_value
      .value,
    reposts: data.data.find((item) => item.name === "reposts").total_value
      .value,
    quotes: data.data.find((item) => item.name === "quotes").total_value.value,
  };

  const ctx = document.getElementById("engagementChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(engagementData),
      datasets: [
        {
          data: Object.values(engagementData),
          backgroundColor: [
            // "rgb(255, 99, 132)",
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
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

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
