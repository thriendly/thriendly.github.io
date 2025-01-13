$(document).ready(function () {
    let currentPage = 1;
    const itemsPerPage = 5;
    let threads = [];
    let idToken = '';
    let userId = '';
    let currentStatus = 'scheduled';

    function showAlert(message, type = "info") {
        const alertElement = $("#globalAlert");
        alertElement
            .removeClass("d-none alert-info alert-success alert-warning alert-danger")
            .addClass(`alert-${type}`)
            .text(message)
            .show();
    }
    
    function hideAlert() {
        const alertElement = $("#globalAlert");
        alertElement.hide().addClass("d-none");
    }

    $("#loading").show();

    // Handle user authentication
    checkAuthAndExecute((user) => {
        user.getIdToken().then((token) => {
            idToken = token;
            userId = user.uid;

            const profileAPI = `${SCHEDULER_URL}/bluesky/profiles/list`;
            const url = new URL(profileAPI);
            url.searchParams.append("userId", userId);

            fetch(url, {
                headers: { Authorization: "Bearer " + idToken }
            })
            .then(response => response.json())
            .then(accounts => {
                
                const $profileDropdownMenu = $("#profileDropdownMenu");
                    $profileDropdownMenu.empty();
                    $profileDropdownMenu.append('<li><a class="dropdown-item" href="#" data-value="null">All</a></li>');
                    if (accounts && accounts.length > 0) {
                        accounts.forEach((account) => {
                            console.log(account.blueskyUsername);
                            $profileDropdownMenu.append(
                                `<li><a class="dropdown-item" href="#" data-value="${account.blueskyUsername}">${account.blueskyUsername}</a></li>`
                            );
                        });
                    }

                    console.log($profileDropdownMenu.html());


                    // Handle dropdown item click
                    $profileDropdownMenu.on("click", ".dropdown-item", function () {
                        const selectedValue = $(this).data("value");
                        const selectedText = $(this).text();
                        $("#profileDropdownButton").text(selectedText); // Update button text
                        selectedThreadsUserId = selectedValue; // Update selected profile ID
                    
                        // Fetch threads for the selected profile
                        currentPage = 1; // Reset to the first page
                        threads = []; // Clear existing threads
                        $("#thread-list").empty(); // Clear thread list UI
                        $("#loading").show(); // Show loading spinner
                        fetchScheduledThreads(idToken, userId, currentPage, selectedThreadsUserId);
                    });
                    

            })
            .catch(error => {
                console.error("Error fetching profiles:", error);
                alert("An error occurred while fetching profiles.");
            });

            // Fetch scheduled threads
            fetchScheduledThreads(idToken, userId, currentPage);
        }).catch((error) => {
            console.error("Error getting ID token:", error.message);
        });
    });

    $(`.nav-custom[data-status="${currentStatus}"]`).addClass('active');

    $(".nav-custom").on("click", function() {
        const newStatus = $(this).data("status");
        if (newStatus !== currentStatus) {
            currentStatus = newStatus;
            currentPage = 1;
            threads = [];
            $("#thread-list").empty();
            $("#loading").show();

            // Update active state visually
            $(".nav-custom").removeClass('active');
            $(this).addClass('active');

            // Fetch threads based on new status
            fetchScheduledThreads(idToken, userId, currentPage);
        }
    });

    // Functions for listing scheduled threads
    function fetchScheduledThreads(idToken, userId, page, threadsUserId = null) {
        $.ajax({
            url: `${SCHEDULER_URL}/bluesky/list`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            data: {
                userId: userId,
                threadsUserId: threadsUserId,
                status: currentStatus,
                page: page,
                itemsPerPage: itemsPerPage
            },
            dataType: "json",
            success: function (response) {
                $("#loading").hide();
                hideAlert();
                if (response.Threads && response.Threads.length > 0) {
                    // Process threads to include contentPreview
                    response.Threads.forEach(thread => {
                        if (Array.isArray(thread.content) && thread.content.length > 0) {
                            if (typeof thread.content[0] === 'string') {
                                thread.contentPreview = thread.content[0];
                            } else if (thread.content[0].thread_content) {
                                thread.contentPreview = thread.content[0].thread_content;
                            }
                        } else if (typeof thread.contentPreview === 'string') {
                            // Use existing contentPreview if available
                        } else {
                            thread.contentPreview = '';
                        }
                    });

                    threads = threads.concat(response.Threads); // Append new threads
                    renderThreads(); // Re-render the threads

                    // Determine if there are more threads to load
                    const hasMore = response.Threads.length === itemsPerPage;
                    renderLoadMoreButton(hasMore);
                } else {
                    showAlert("No Posts available.", "info");
                    renderLoadMoreButton(false);
                }
            },
            error: function (xhr, status, error) {
                $("#thread-list").html("<p>Error loading Posts.</p>");
            }
        });
    }

    function renderThreads() {
        const threadList = $("#thread-list");
        threadList.empty();
        hideAlert();
    
        if (threads.length === 0) {
            return;
        }
    
        $.each(threads, function (index, thread) {
            const contentHtml = formatContent(thread.contentPreview);
            const scheduledTime = new Date(thread.scheduledTime);
            const formattedDate = scheduledTime.toLocaleDateString();
            const formattedTime = scheduledTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
            let actionButtonsHtml;
            if (thread.status && thread.status.toUpperCase() === "SUCCESS") {
                // Published post: show green "View" button only
                actionButtonsHtml = `<button class="btn btn-sm btn-success btn-view" data-id="${thread.postId}">View</button>`;
            } else {
                // Scheduled or other statuses: show Edit and Delete
                actionButtonsHtml = `
                    <button class="btn btn-sm btn-edit" data-id="${thread.postId}">Edit</button>
                    <button class="btn btn-sm btn-delete" data-id="${thread.postId}">Delete</button>
                `;
            }
    
            const threadCard = `
                <div class="card mb-4 thread-card" data-id="${thread.postId}">
                    <div class="card-body">
                        <div class="thread-content mb-3">${contentHtml}</div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="time-display mt-3" title="${scheduledTime.toLocaleString()}">
                                <i class="bi profile-icon bi-person-circle mr-2"></i>
                                <span class="profile-name">${thread.profileName}</span>
                                <i class="fas fa-clock clock-icon"></i>
                                ${formattedDate} ${formattedTime}
                            </span>
                            <div class="action-buttons">
                                ${actionButtonsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            threadList.append(threadCard);
        });
    
        // Update event bindings
        $(".btn-edit").off("click").on("click", function (e) {
            e.stopPropagation();
            const postId = $(this).data("id");
            openUpdateModal(postId);
        });
        $(".btn-delete").off("click").on("click", function (e) {
            e.stopPropagation();
            const postId = $(this).data("id");
            deleteThread(postId);
        });
    
        $(".btn-view").off("click").on("click", function (e) {
            e.stopPropagation();
            const postId = $(this).data("id");
            openUpdateModal(postId); // Same modal, but we’ll hide compose parts if success
        });
    
        $(".thread-card").off("click").on("click", function (e) {
            if (!$(e.target).hasClass('btn-edit') && !$(e.target).hasClass('btn-delete') && !$(e.target).hasClass('btn-view')) {
                const postId = $(this).data("id");
                openUpdateModal(postId);
            }
        });
    }

    function formatContent(content) {
        if (typeof content === 'string' && content.trim() !== '') {
            return content.split('\n').map(line => `<p class="mb-1">${line}</p>`).join('');
        } else {
            return '<p class="mb-1">(No content)</p>';
        }
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

    function resetModalUI() {
        $(".section-header").show();
        $(".datetime-row").show();
        $("#updateThreadContent").closest(".mb-3").show();
        $("#charCount").show();
        $("#update-thread-form button[type='submit']").show();
        $("#updateThreadModalLabel").text("Update Thread");
    
        // Restore the preview header text
        $(".preview-header").text("Preview");
    
        // Target the edit and preview columns
        const editCol = $(".modal-body .row .col-md-6").first();
        const previewCol = $(".modal-body .row .col-md-6").last();
    
        editCol.show();
        previewCol.removeClass('offset-md-3 text-center col-12').addClass('col-md-6');
    
        $("#updatePreview").removeClass('text-center');
    }

    function openUpdateModal(postId) {
        $.ajax({
            url: `${SCHEDULER_URL}/bluesky/post`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            data: {
                userId: userId,
                postId: postId
            },
            dataType: "json",
            success: function (response) {
                const thread = response.threadDetails;
                if (!thread) {
                    alert("Failed to load Post. Please try again.");
                    return;
                }

                resetModalUI();

                $("#updateThreadPostId").val(postId);

                // Set scheduled date and time
                const currentScheduledDate = new Date(new Date(thread.scheduledTime).toLocaleDateString());
                //const currentScheduledTime = new Date(new Date(thread.scheduledTime)).toLocaleTimeString();
                const currentScheduledTime = new Date(thread.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                const formattedDate = currentScheduledDate.toISOString().slice(0, 10);
                const formattedTime = currentScheduledTime;
                $("#updateThreadScheduleDate").val(formattedDate);
                $("#updateThreadScheduleTime").val(formattedTime);

                // Get today's local date in YYYY-MM-DD
                const today = new Date();
                const currentLocalDate = today.getFullYear() + '-' +
                    String(today.getMonth() + 1).padStart(2, '0') + '-' +
                    String(today.getDate()).padStart(2, '0');

                // Set the min attribute to prevent selecting older dates
                $("#updateThreadScheduleDate").attr("min", currentLocalDate);

                // Add a change event to reset if older date is entered
                $("#updateThreadScheduleDate").off("change").on("change", function () {
                    const selectedDate = $(this).val();
                    if (selectedDate && selectedDate < currentLocalDate) {
                        alert("You cannot select a date older than today.");
                        $(this).val(''); // Reset the date field
                    }
                });

                $("#updateThreadScheduleTime").off("change").on("change", function () {
                    const selectedDate = $("#updateThreadScheduleDate").val();
                    const selectedTime = $(this).val();
                    if (!selectedTime || !selectedDate) return;
    
                    // If the selected date is today, verify the time constraint
                    if (selectedDate === currentLocalDate) {
                        const now = new Date();
                        const [selHour, selMinute] = selectedTime.split(':').map(Number);
                        const selectedDateObj = new Date(now.getFullYear(), now.getMonth(), now.getDate(), selHour, selMinute);
    
                        // Minimum allowed time is now + 1 minute
                        const minAllowedTime = new Date(now.getTime());
    
                        if (selectedDateObj < minAllowedTime) {
                            alert("Thriendly cannot schedule a post for current time, Please select a future time.");
                            $(this).val(''); // Reset the time field
                        }
                    }
                });

                // Process content
                let contentString = '';
                if (Array.isArray(thread.content) && thread.content.length > 0) {
                    // Content is an array of objects with 'thread_content'
                    contentString = thread.content.map(item => item.thread_content || '').join('\n---\n');
                } else if (typeof thread.content === 'string' && thread.content.trim() !== '') {
                    // Content might be a JSON stringified array
                    try {
                        const contentArray = JSON.parse(thread.content);
                        if (Array.isArray(contentArray) && contentArray.length > 0) {
                            contentString = contentArray.map(item => item.thread_content || '').join('\n---\n');
                        } else {
                            contentString = thread.content;
                        }
                    } catch (e) {
                        contentString = thread.content;
                    }
                } else {
                    contentString = '';
                }

                $("#updateThreadContent").val(contentString);

                // Update the preview
                updateModalPreview();
                if (thread.status && thread.status.toUpperCase() === "SUCCESS") {
                    // Hide the compose UI elements as before
                    $(".section-header").hide();
                    $(".datetime-row").hide();
                    $("#updateThreadContent").closest(".mb-3").hide();
                    $("#charCount").hide();
                    $("#update-thread-form button[type='submit']").hide();
                    $("#updateThreadModalLabel").text("View Thread");

                    $("#reuseButton").show();
                
                    // Change "Preview" to "Published Thread"
                    $(".preview-header").text("Published Thread");
                
                    // Hide the edit column (first col-md-6)
                    $(".modal-body .row .col-md-6").first().hide();
                
                    // Center the preview column by adding an offset
                    const previewCol = $(".modal-body .row .col-md-6").last();
                    // Keep it col-md-6, just add offset-md-3 to center it in a 12-column grid
                    previewCol.removeClass('col-md-6').addClass('col-md-6 offset-md-3');
                
                    // Center the preview content text
                    $("#updatePreview").addClass('text-center');
                } else {
                    $("#reuseButton").hide();
                }

                $("#reuseButton").on("click", function(e) {
                    e.preventDefault();
                    
                    // Get the content from modal text box
                    const content = $("#updateThreadContent").val();
                  
                    // Hide current content container, show scheduler container, etc.
                    $("#schedulerContainer").show();
                    $("#listPostsContainer").hide();
                    $(".section-header").show();
                  
                    // Populate scheduler textarea (e.g., #threadContent) with the content
                    $("#threadContent").val(content);
                  
                    // Optionally call any resizing or preview updates
                    autoResizeTextarea(document.getElementById("threadContent"));

                    updatePreview();
                  
                    // Close the modal if desired
                    $("#updateThreadModal").modal("hide");
                  });

                $("#updateThreadModal").modal({
                    backdrop: 'static',  // Prevent clicking outside to close immediately
                    keyboard: false      // Disables ESC key from closing the modal
                }).modal("show");

                // Handle "Back" button click on scheduler page
            $('#schedulerBackButton').on('click', function () {
                if (confirm("Are you sure you want to go back? Any edits made to the post will be lost.")) {
                    $('#schedulerContainer').hide();
                    $("#listPostsContainer").show();
                    $("#updateThreadModal").modal("show");
                }
            });

            },
            error: function (xhr, status, error) {
                console.error("Error fetching thread content:", error);
                alert("Failed to load thread content. Please try again.");
            }
        });
    }

    // Update the preview in the modal whenever content changes
    $('#updateThreadContent').on('input', function () {
        updateModalPreview();
    });

    

    function updateModalPreview() {
        // Get content from the textarea
        const content = $('#updateThreadContent').val();
        
        // Split the content by the delimiter '---' to create subposts
        const subposts = splitTextByDelimiter(content);
        let previewHtml = '';
    
        // Generate HTML for each subpost with numbering, character count, and formatting
        subposts.forEach((subpost, index) => {
            previewHtml += `
                ${
                    index == 0
                        ? '<div class="number-padding"></div>'
                        : ''
                }
                <div class="preview-item">
                    <div class="thread-preview">
                        <div class="thread-number">${index + 1}</div>
                        <div class="thread-content">${subpost}</div>
                        <span class="char-count">${subpost.length} characters</span>
                        ${
                            index < subposts.length - 1
                                ? '<div class="connecting-line"></div>'
                                : ''
                        }
                    </div>
                    
                </div>
            `;
        });
    
        // Insert the generated HTML into the preview container
        $('#updatePreview').html(previewHtml);
        
        // Update the character count below the textarea
        $('#charCount').text(`Total characters: ${content.length}`);
    }
    

    // Helper functions for splitting content
    function splitTextIntoChunks(text, maxLength) {
        const chunks = [];
        let remainingText = text;
        while (remainingText.length > maxLength) {
            let chunk = remainingText.substring(0, maxLength + 1);
            let lastSpace = chunk.lastIndexOf(' ');
            if (lastSpace > -1 && lastSpace > 0) {
                chunk = remainingText.substring(0, lastSpace);
            } else {
                chunk = remainingText.substring(0, maxLength);
            }
            chunks.push(chunk.trim());
            remainingText = remainingText.substring(chunk.length).trim();
        }
        if (remainingText.length > 0) {
            chunks.push(remainingText);
        }
        return chunks;
    }

    function splitTextByDelimiter(text, delimiter = '---', maxLength = 300) {
        const subposts = text.split(delimiter)
                             .map(s => s.trim())
                             .filter(s => s.length > 0);

        const result = [];
        subposts.forEach(subpost => {
            if (subpost.length <= maxLength) {
                result.push(subpost);
            } else {
                const chunks = splitTextIntoChunks(subpost, maxLength);
                result.push(...chunks);
            }
        });
        return result;
    }

    // Handle update form submission
    $("#update-thread-form").on("submit", function (e) {
        e.preventDefault();

        // Disable the Save Changes button
        const $saveButton = $("#update-thread-form button[type='submit']");
        $saveButton.prop('disabled', true);

        const postId = $("#updateThreadPostId").val();
        const scheduleDate = $("#updateThreadScheduleDate").val();
        const scheduleTime = $("#updateThreadScheduleTime").val();

        if (!scheduleDate || !scheduleTime) {
            alert("Please select a schedule date and time");
            $saveButton.prop('disabled', false);
            return;
        }

        // Combine date and time into ISO string in UTC
        const [year, month, day] = scheduleDate.split('-').map(Number);
        const [hour, minute] = scheduleTime.split(':').map(Number);
        const localDate = new Date(year, month - 1, day, hour, minute);

        // Convert to UTC using getTime() and toISOString()
        const newScheduleTime = new Date(localDate.toUTCString()).toISOString();

        // Get content from the textarea
        let contentString = $("#updateThreadContent").val();

        // Use the updated splitting function
        const textChunks = splitTextByDelimiter(contentString);

        // Create an array of JSON objects with thread_id and thread_content
        const contentArray = textChunks.map(chunk => ({
            thread_id: "",
            thread_content: chunk
        }));

        // Prepare data for API call
        const data = {
            content: contentArray,
            newScheduleTime: newScheduleTime
        };

        // Make the API call to update the thread
        $.ajax({
            url: `${SCHEDULER_URL}/bluesky/update?userId=${userId}&postId=${postId}`,
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${idToken}`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            success: function (response, textStatus, jqXHR) {
                if (jqXHR.status === 200 || jqXHR.status === 204) {
                    const threadIndex = threads.findIndex((t) => (t.postId) === postId);
                    if (threadIndex !== -1) {
                        // Update the thread in the threads array
                        threads[threadIndex].content = contentArray;
                        threads[threadIndex].scheduledTime = newScheduleTime; // Use the updated schedule time

                        // Update contentPreview with first subpost's content
                        if (contentArray.length > 0) {
                            threads[threadIndex].contentPreview = contentArray[0].thread_content;
                        } else {
                            threads[threadIndex].contentPreview = '';
                        }

                        renderThreads();
                    }
                    $("#updateThreadModal").modal("hide");
                } else {
                    console.error("Failed to update Post. Status code:", jqXHR.status);
                    alert("Failed to update the Post. Please try again.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error updating Post:", error);
                alert("Failed to update the Post. Please try again.");
            },
            complete: function () {
                // Re-enable the Save Changes button
                $saveButton.prop('disabled', false);
            }
        });
    });

    // Function to delete a thread
    function deleteThread(postId) {
        if (!confirm("Are you sure you want to delete this Post?")) {
            return;
        }

        $.ajax({
            url: `${SCHEDULER_URL}/bluesky/delete?userId=${userId}&postId=${postId}`,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${idToken}`,
                "Content-Type": "application/json"
            },
            success: function (response, textStatus, jqXHR) {
                if (jqXHR.status === 200 || jqXHR.status === 204) {
                    // Remove the thread from the threads array
                    threads = threads.filter((t) => t.postId !== postId);
                    renderThreads();
                    alert("Post deleted successfully.");
                } else {
                    console.error("Failed to delete post. Status code:", jqXHR.status);
                    alert("Failed to delete the Post. Please try again.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error deleting Post:", error);
                alert("Failed to delete the Post. Please try again.");
            }
        });
    }
});
