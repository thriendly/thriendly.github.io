// threads-list.js

$(document).ready(function () {
  let currentPage = 1;
  const itemsPerPage = 2;
  let threads = [];
  let idToken = '';
  let userId = '';

  // Handle user authentication
  checkAuthAndExecute((user) => {
      user.getIdToken().then((token) => {
          idToken = token;
          userId = user.uid;

          // Fetch scheduled threads
          fetchScheduledThreads(idToken, userId, currentPage);
      }).catch((error) => {
          console.error("Error getting ID token:", error.message);
      });
  });

  // Functions for listing scheduled threads
  function fetchScheduledThreads(idToken, userId, page) {
      $.ajax({
          url: `https://scheduler-dev.pramodnanduri.workers.dev/threads/list`,
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
                  alert("There are no more scheduled threads. Go to 'Threads' to schedule more.");
                  // Remove Load More button if it exists
                  renderLoadMoreButton(false);
              }
          },
          error: function (xhr, status, error) {
              $("#thread-list").html("<p>Error loading threads.</p>");
          }
      });
  }

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

  function formatContent(content) {
      return content.split('\n').map(line => `<p class="mb-1">${line}</p>`).join('');
  }

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

  function confirmDelete(postId) {
      if (confirm("Are you sure you want to delete this thread?")) {
          $.ajax({
              url: `http://scheduler-dev.pramodnanduri.workers.dev/threads/delete?userId=${userId}&postId=${postId}`,
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${idToken}`,
                  "Content-Type": "application/json"
              },
              success: function (response, textStatus, jqXHR) {
                  if (jqXHR.status === 200) {
                      // Remove the deleted thread from the local threads array
                      const index = threads.findIndex((thread) => thread.postId === postId);
                      if (index !== -1) {
                          threads.splice(index, 1);
                          renderThreads();
                      }
                  } else {
                      alert("Failed to delete the thread. Please try again.");
                  }
              },
              error: function (xhr, status, error) {
                  alert("Failed to delete the thread. Please try again.");
              }
          });
      }
  }

  function openUpdateModal(postId) {
      const thread = threads.find((t) => t.postId === postId);
      if (thread) {
          $("#updateThreadContent").val(thread.content);
          $("#updateThreadPostId").val(postId);
          const scheduledTime = new Date(thread.scheduledTime);
          const formattedTime = scheduledTime.getFullYear() + '-' +
              String(scheduledTime.getMonth() + 1).padStart(2, '0') + '-' +
              String(scheduledTime.getDate()).padStart(2, '0') + 'T' +
              String(scheduledTime.getHours()).padStart(2, '0') + ':' +
              String(scheduledTime.getMinutes()).padStart(2, '0');

          $("#updateThreadScheduleTime").val(formattedTime);
          $("#updateThreadModal").modal("show");
      }
  }

  // Handle update form submission
  $("#update-thread-form").on("submit", function (e) {
      e.preventDefault();
      const updatedContent = $("#updateThreadContent").val();
      const postId = $("#updateThreadPostId").val();
      const newScheduleTimeInput = $("#updateThreadScheduleTime").val();

      const thread = threads.find((t) => t.postId === postId);
      if (thread) {
          // Prepare data for API call
          const data = {
              content: updatedContent,
              newScheduleTime: new Date(newScheduleTimeInput).toISOString()
          };

          // Make the API call to update the thread
          $.ajax({
              url: `https://scheduler-dev.pramodnanduri.workers.dev/threads/update?userId=${userId}&postId=${postId}`,
              method: "PATCH",
              headers: {
                  "Authorization": `Bearer ${idToken}`,
                  "Content-Type": "application/json"
              },
              data: JSON.stringify(data),
              success: function (response, textStatus, jqXHR) {
                  if (jqXHR.status === 200) {
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
});
