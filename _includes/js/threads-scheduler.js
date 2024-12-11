// threads-scheduler.js

function updatePreview() {
    const content = $("#threadContent").val();
    const subposts = splitTextByDelimiter(content);
    let previewHtml = '';

    subposts.forEach((subpost, index) => {
        previewHtml += `
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
            
        `;
    });

    $("#preview").html(previewHtml);
}

// Helper function to split text into chunks of maxLength characters, splitting at spaces
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

// Updated function to split text based on '---' delimiter and ensure each subpost is <= 500 characters
function splitTextByDelimiter(text, delimiter = '---', maxLength = 500) {
    const subposts = text.split(delimiter)
                         .map(s => s.trim())
                         .filter(s => s.length > 0);

    const result = [];
    subposts.forEach(subpost => {
        if (subpost.length <= maxLength) {
            result.push(subpost);
        } else {
            // Further split subposts longer than maxLength
            const chunks = splitTextIntoChunks(subpost, maxLength);
            result.push(...chunks);
        }
    });
    return result;
}

$(document).ready(function () {
    let idToken = '';
    let userId = '';

    // Initialize date input
    const dateInput = document.getElementById("date");
    if (dateInput) {
        const today = new Date();
        const currentDate = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');
        dateInput.setAttribute("min", currentDate);

        const futureDate = new Date();
        futureDate.setDate(today.getDate() + 31);
        const maxDate = futureDate.toISOString("en-US").split("T")[0];
        dateInput.setAttribute("max", maxDate);

        dateInput.addEventListener('change', () => {
            const selectedDate = dateInput.value;
            if (selectedDate && selectedDate < currentDate) {
                alert('You cannot select a date older than today.');
                dateInput.value = '';
            }
        });
    }

    // Handle user authentication
    checkAuthAndExecute((user) => {
        user.getIdToken().then((token) => {
            idToken = token;
            userId = user.uid;
            threadsUserId = sessionStorage.getItem("currentThreadsUserId");
        }).catch((error) => {
            console.error("Error getting ID token:", error.message);
        });
    });

    
    

    // Update the preview whenever the content changes
    $("#threadContent").on("input", function () {
        updatePreview();
    });


    // Handle scheduling a new thread
    $("#scheduleButton").on("click", function () {
        // Disable the schedule button
        const $scheduleButton = $(this);
        $scheduleButton.prop('disabled', true);

        const text = $("#threadContent").val();
        const date = $("#date").val();
        const time = $("#appt").val();

        if (!date || !time) {
            alert("Please select both schedule date and time");
            $scheduleButton.prop('disabled', false); // Re-enable the button
            return;
        }

        const combinedDateTime = `${date}T${time}:00`;
        const localDateTime = new Date(combinedDateTime);
        const schedule_time = localDateTime.toISOString();
        const created_time = new Date().toISOString();
        const status = "SCHEDULED";

        // Use the updated splitting function
        const textChunks = splitTextByDelimiter(text);

        // Create an array of JSON objects with thread_id and thread_content
        const contentArray = textChunks.map(chunk => ({
            thread_id: "",
            thread_content: chunk
        }));

        const threadData = {
            content: contentArray, // Use the new format here
            schedule_time: schedule_time,
            created_time: created_time,
            status: status,
            userId: userId,
            threadsUserId: threadsUserId,
        };

        const schedulerAPI = `${SCHEDULER_URL}/threads/schedule`;

        $.ajax({
            url: schedulerAPI,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(threadData),
            headers: {
                Authorization: "Bearer " + idToken,
                "Content-Type": "application/json",
            },
            success: function (data) {
                alert("Thread scheduled successfully!");
                
                // Clear the form and preview
                $("#threadContent").val('');
                $("#date").val('');
                $("#appt").val('');
                $("#preview").html('');
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                alert("An error occurred while scheduling the thread. Please try again.");
            },
            complete: function () {
                // Re-enable the schedule button
                $scheduleButton.prop('disabled', false);
            }
        });
    });
});


