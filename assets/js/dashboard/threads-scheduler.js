// $(document).ready(function () {
//   $("#sidebarCollapse").on("click", function () {
//     $("#sidebar").toggleClass("active");
//   });

//   const dateInput = document.getElementById("date");

//   const today = new Date();
//   const currentDate = today.toISOString().split("T")[0];
//   dateInput.setAttribute("min", currentDate);

//   const futureDate = new Date();
//   futureDate.setDate(today.getDate() + 31);
//   const maxDate = futureDate.toISOString().split("T")[0];

//   dateInput.setAttribute("max", maxDate);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("scheduleButton")
//     .addEventListener("click", function () {
//       const text = document.getElementById("threadContent").value;
//       const date = document.getElementById("date").value;
//       const time = document.getElementById("appt").value;
//       const sessionDataKey = Object.keys(sessionStorage).find((key) =>
//         key.startsWith('firebase:authUser')
//       );
//       if (!sessionDataKey) {
//         alert("User session data not found!");
//         return;
//       }

//       const sessionData = JSON.parse(sessionStorage.getItem(sessionDataKey));
//       const user_id = sessionData?.uid; // Extracting user_id dynamically
//       const threads_user_id = "26317239004558600"; // Hard-coded
//       const status = "SCHEDULED";

//       if (!date || !time) {
//         alert("Please select both schedule date and time");
//         return;
//       }
     
//       const combinedDateTime = `${date}T${time}:00`;
//       const localDateTime = new Date(combinedDateTime);
//       const schedule_time = localDateTime.toISOString();

//       const created_time = new Date().toISOString();
//       console.log("Schedule Time:", schedule_time);
//       console.log("Created Time:", created_time);

//       const threadData = {
//         text: text,
//         schedule_time: schedule_time,
//         created_time: created_time,
//         status: status,
//         userId: user_id,
//         threadsUserId: threads_user_id,
//       };

//       const schedulerAPI =
//         "http://localhost:8787/threads/schedule";

//       $.ajax({
//         url: schedulerAPI,
//         type: "POST",
//         dataType: "json",
//         data: JSON.stringify(threadData),
//         success: function (data) {
//           console.log("Success:", data);
//           alert("Thread scheduled successfully!");
//         },
//         error: function (error) {
//           console.error("Error:", error);
//           alert("An error occurred while scheduling the thread.");
//         },
//       });
//     });
// });


// threads-scheduler.js

$(document).ready(function () {
  // Existing code for sidebar toggle
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  // Initialize date input
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date();
    const currentDate = today.toISOString().split("T")[0];
    dateInput.setAttribute("min", currentDate);

    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 31);
    const maxDate = futureDate.toISOString().split("T")[0];

    dateInput.setAttribute("max", maxDate);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  // Retrieve user session data
  const sessionDataKey = Object.keys(sessionStorage).find((key) =>
    key.startsWith("firebase:authUser")
  );
  if (!sessionDataKey) {
    alert("User session data not found!");
    return;
  }

  const sessionData = JSON.parse(sessionStorage.getItem(sessionDataKey));
  const user_id = sessionData?.uid; // Extracting user_id dynamically

  // Get the ID token
  const idToken = sessionData.stsTokenManager.accessToken;

  // Validate the user
  const validationResponse = await validateUser(user_id, idToken);

  if (validationResponse.schedulerUI) {
    // User is premium, display the scheduler UI
    document.getElementById("schedulerUI").style.display = "block";
    document.getElementById("nonPremiumUI").style.display = "none";

    // Attach event listener to the schedule button
    document
      .getElementById("scheduleButton")
      .addEventListener("click", function () {
        const text = document.getElementById("threadContent").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("appt").value;

        if (!date || !time) {
          alert("Please select both schedule date and time");
          return;
        }

        const combinedDateTime = `${date}T${time}:00`;
        const localDateTime = new Date(combinedDateTime);
        const schedule_time = localDateTime.toISOString();

        const created_time = new Date().toISOString();
        console.log("Schedule Time:", schedule_time);
        console.log("Created Time:", created_time);

        const threads_user_id = "26317239004558600"; // Hard-coded
        const status = "SCHEDULED";

        const threadData = {
          text: text,
          schedule_time: schedule_time,
          created_time: created_time,
          status: status,
          userId: user_id,
          threadsUserId: threads_user_id,
        };

        const schedulerAPI = "http://localhost:8787/threads/schedule?userId=" + user_id;

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
            console.log("Success:", data);
            alert("Thread scheduled successfully!");
          },
          error: function (error) {
            if (error.status === 403) {
              alert("Upgrade to premium to use this feature.");
              // Optionally redirect or display upgrade options
              document.getElementById("schedulerUI").style.display = "none";
              document.getElementById("nonPremiumUI").style.display = "block";
            } else {
              console.error("Error:", error);
              alert("An error occurred while scheduling the thread.");
            }
          },
        });
      });
  } else {
    // User is not premium, display the non-premium UI
    document.getElementById("schedulerUI").style.display = "none";
    document.getElementById("nonPremiumUI").style.display = "block";
  }
});

// Function to validate if the user is premium
async function validateUser(userId, idToken) {
  const validateAPI = "http://localhost:8787/users?userId=" + userId;
  try {
    const response = await fetch(validateAPI, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.threadsFeatures.includes("scheduler")) {
        return { schedulerUI: true };
      } else {
        return { schedulerUI: false };
      }
    }
  } catch (error) {
    console.error("Error validating user:", error);
    return { schedulerUI: false };
  }
}
