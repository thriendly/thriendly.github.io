const itemsPerPage = 2; // Number of threads per page
let currentPage = 1;
let threads = [];
let idToken = ''; // Global variable to store the idToken
let userId = '';  // Global variable to store the userId

// Fetch scheduled threads from the API using the idToken
function fetchScheduledThreads(idToken, userId, page) {
  $.ajax({
    url: `http://localhost:8787/threads/list`,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${idToken}`,
      "Content-Type": "application/json"
    },
    data: {
      userId: userId,
      status: "scheduled",
      page: page,
      itemsPerPage: itemsPerPage
    },
    dataType: "json",
    success: function (response) {
      if (response.Threads && response.Threads.length > 0) {
        threads = threads.concat(response.Threads); // Append new threads
        renderThreads(); // Re-render the threads

        // Determine if there are more threads to load
        const hasMore = response.Threads.length === itemsPerPage;
        renderLoadMoreButton(hasMore);
      } else {
        // No more threads to load
        console.log("No more threads to load.");
        alert("There are no more scheduled threads. Go to 'Threads' to schedule more.");
        // Remove Load More button if it exists
        renderLoadMoreButton(false);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching scheduled threads:", error);
      $("#thread-list").html("<p>Error loading threads.</p>");
    }
  });
}

// Function to render the threads on the page
function renderThreads() {
  const threadList = $("#thread-list");
  threadList.empty();

  if (threads.length === 0) {
    threadList.html("<p>No threads to display.</p>");
    return;
  }

  $.each(threads, function (index, thread) {
    const threadCard = `
      <div class="card mb-4">
        <div class="card-body">
          <div class="thread-content mb-3">${formatContent(thread.content)}</div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="time-display mt-3" title="${new Date(thread.scheduledTime).toLocaleString()}">
              <i class="fas fa-clock clock-icon"></i>
              ${new Date(thread.scheduledTime).toLocaleDateString()} ${new Date(thread.scheduledTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <div>
              <button class="btn btn-outline-secondary btn-sm update-btn" data-id="${thread.postId}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-outline-secondary btn-sm delete-btn" data-id="${thread.postId}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    threadList.append(threadCard);
  });

  // Attach event handlers for update and delete buttons
  $(".delete-btn").off("click").on("click", function () {
    const postId = $(this).data("id");
    confirmDelete(postId);
  });

  $(".update-btn").off("click").on("click", function () {
    const postId = $(this).data("id");
    openUpdateModal(postId);
  });
}

// Helper function to format the content for display
function formatContent(content) {
  return content.split('\n').map(line => `<p class="mb-1">${line}</p>`).join('');
}

// Function to render the Load More button
function renderLoadMoreButton(hasMore) {
  const loadMoreContainer = $("#load-more-container");
  loadMoreContainer.empty();

  if (hasMore) {
    const loadMoreButton = `
      <button id="load-more-button" class="btn btn-primary">Load More</button>
    `;
    loadMoreContainer.append(loadMoreButton);

    $("#load-more-button").off("click").on("click", function () {
      currentPage++;
      fetchScheduledThreads(idToken, userId, currentPage);
    });
  }
}

// Confirm delete function
function confirmDelete(postId) {
  if (confirm("Are you sure you want to delete this thread?")) {
    $.ajax({
      url: `http://localhost:8787/threads/delete?userId=${userId}&postId=${postId}`,
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
      success: function (response, textStatus, jqXHR) {
        if (jqXHR.status === 200) {
          console.log("Thread deleted successfully:", response);
          // Remove the deleted thread from the local threads array
          const index = threads.findIndex((thread) => thread.postId === postId);
          if (index !== -1) {
            threads.splice(index, 1);
            renderThreads();
          }
        } else {
          console.error("Failed to delete thread. Status code:", jqXHR.status);
          alert("Failed to delete the thread. Please try again.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error deleting thread:", error);
        alert("Failed to delete the thread. Please try again.");
      }
    });
  } else {
    console.log("Delete action cancelled");
  }
}

// Open update modal function
function openUpdateModal(postId) {
  const thread = threads.find((t) => t.postId === postId);
  if (thread) {
    $("#threadContent").val(thread.content);
    $("#threadPostId").val(postId);
    const scheduledTime = new Date(thread.scheduledTime);
    const formattedTime = scheduledTime.getFullYear() + '-' +
      String(scheduledTime.getMonth() + 1).padStart(2, '0') + '-' +
      String(scheduledTime.getDate()).padStart(2, '0') + 'T' +
      String(scheduledTime.getHours()).padStart(2, '0') + ':' +
      String(scheduledTime.getMinutes()).padStart(2, '0');

    $("#threadScheduleTime").val(formattedTime);
    $("#updateThreadModal").modal("show");
  }
}

// Handle update form submission
$("#update-thread-form").on("submit", function (e) {
  e.preventDefault();
  const updatedContent = $("#threadContent").val();
  const postId = $("#threadPostId").val();
  const newScheduleTimeInput = $("#threadScheduleTime").val();

  const thread = threads.find((t) => t.postId === postId);
  if (thread) {
    // Prepare data for API call
    const data = {
      content: updatedContent,
      newScheduleTime: new Date(newScheduleTimeInput).toISOString()
    };

    // Make the API call to update the thread
    $.ajax({
      url: `http://localhost:8787/threads/update?userId=${userId}&postId=${postId}`,
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data),
      success: function (response, textStatus, jqXHR) {
        if (jqXHR.status === 200) {
          console.log("Thread updated successfully:", response);
          // Update the thread in the local array
          thread.content = updatedContent;
          if (data.newScheduleTime) {
            thread.scheduledTime = data.newScheduleTime;
          }
          $("#updateThreadModal").modal("hide");
          renderThreads();
        } else {
          console.error("Failed to update thread. Status code:", jqXHR.status);
          alert("Failed to update the thread. Please try again.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error updating thread:", error);
        alert("Failed to update the thread. Please try again.");
      }
    });
  }
});

// Function to be executed after user authentication
function authenticatedAction(user) {
  user.getIdToken().then((token) => {
    idToken = token;
    const allKeys = Object.keys(sessionStorage);

    const matchingKey = allKeys.find(key => key.startsWith('firebase:authUser'));
    const sessionData = sessionStorage.getItem(matchingKey);
    const parsedData = JSON.parse(sessionData);
    userId = parsedData?.uid; // Assign to global userId

    fetchScheduledThreads(idToken, userId, currentPage); // Fetch the first page of threads
  }).catch((error) => {
    console.error("Error getting ID token:", error.message);
  });
}

// Ensure the user is authenticated before making the request
$(document).ready(function () {
  checkAuthAndExecute(authenticatedAction);
});
