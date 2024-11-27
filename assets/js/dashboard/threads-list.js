$(document).ready(function () {
    let currentPage = 1;
    const itemsPerPage = 5;
    let threads = [];
    let idToken = '';
    let userId = '';

    $("#loading").show();
    
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
            url: `${SCHEDULER_URL}/threads/list`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            data: {
                userId: userId,
                status: "scheduled",
                page: page,
                itemsPerPage: itemsPerPage
            },
            dataType: "json",
            success: function (response) {
                $("#loading").hide();
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
                    // No more threads to load
                    alert("There are no more scheduled threads. Go to 'Threads' to schedule more.");
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
            const contentHtml = formatContent(thread.contentPreview);
            const scheduledTime = new Date(thread.scheduledTime);
            const formattedDate = scheduledTime.toLocaleDateString();
            const formattedTime = scheduledTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const threadCard = `
                <div class="card mb-4 thread-card" data-id="${thread.postId || thread.post_id}">
                    <div class="card-body">
                        <div class="thread-content mb-3">${contentHtml}</div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="time-display mt-3" title="${scheduledTime.toLocaleString()}">
                                <i class="fas fa-clock clock-icon"></i>
                                ${formattedDate} ${formattedTime}
                            </span>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-edit" data-id="${thread.postId}">Edit</button>
                                <button class="btn btn-sm btn-delete" data-id="${thread.postId}">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            threadList.append(threadCard);
        });

        // Attach click event to edit buttons
        $(".btn-edit").off("click").on("click", function (e) {
            e.stopPropagation();
            const postId = $(this).data("id");
            openUpdateModal(postId);
        });

        // Attach click event to delete buttons
        $(".btn-delete").off("click").on("click", function (e) {
            e.stopPropagation();
            const postId = $(this).data("id");
            deleteThread(postId);
        });

        // Attach click event to thread cards (excluding buttons)
        $(".thread-card").off("click").on("click", function (e) {
            if (!$(e.target).hasClass('btn-edit') && !$(e.target).hasClass('btn-delete')) {
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

    function openUpdateModal(postId) {
        $.ajax({
            url: `${SCHEDULER_URL}/threads/post`,
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
                    alert("Failed to load thread content. Please try again.");
                    return;
                }

                $("#updateThreadPostId").val(postId);

                // Set scheduled date and time
                const scheduledTime = new Date(thread.scheduledTime);
                const formattedDate = scheduledTime.toISOString().slice(0, 10);
                const formattedTime = scheduledTime.toTimeString().slice(0, 5);
                $("#updateThreadScheduleDate").val(formattedDate);
                $("#updateThreadScheduleTime").val(formattedTime);

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

                // Resize the textarea to fit content
                //autoResizeTextarea($("#updateThreadContent"));

                // Update the preview
                updateModalPreview();

                // Show the modal
                $("#updateThreadModal").modal("show");
            },
            error: function (xhr, status, error) {
                console.error("Error fetching thread content:", error);
                alert("Failed to load thread content. Please try again.");
            }
        });
    }

    // Function to auto-resize textarea on modal load
    function autoResizeTextarea(textarea) {
        textarea.css('height', 'auto');
        const scrollHeight = textarea[0].scrollHeight;
        textarea.css('height', scrollHeight + 'px');
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

    function splitTextByDelimiter(text, delimiter = '---', maxLength = 500) {
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
        const newScheduleTime = new Date(Date.UTC(year, month - 1, day, hour, minute)).toISOString();

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
            url: `${SCHEDULER_URL}/threads/update?userId=${userId}&postId=${postId}`,
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
                    console.error("Failed to update thread. Status code:", jqXHR.status);
                    alert("Failed to update the thread. Please try again.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error updating thread:", error);
                alert("Failed to update the thread. Please try again.");
            },
            complete: function () {
                // Re-enable the Save Changes button
                $saveButton.prop('disabled', false);
            }
        });
    });

    // Function to delete a thread
    function deleteThread(postId) {
        if (!confirm("Are you sure you want to delete this thread?")) {
            return;
        }

        $.ajax({
            url: `${SCHEDULER_URL}/threads/delete?userId=${userId}&postId=${postId}`,
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
                    alert("Thread deleted successfully.");
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
    }
});
