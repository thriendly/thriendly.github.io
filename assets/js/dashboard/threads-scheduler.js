// threads-scheduler.js

$(document).ready(function () {
  let idToken = '';
  let userId = '';

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

  // Handle user authentication
  checkAuthAndExecute((user) => {
      user.getIdToken().then((token) => {
          idToken = token;
          userId = user.uid;
      }).catch((error) => {
          console.error("Error getting ID token:", error.message);
      });
  });

  // Handle scheduling a new thread
  $("#scheduleButton").on("click", function () {
      const text = $("#threadContent").val();
      const date = $("#date").val();
      const time = $("#appt").val();

      if (!date || !time) {
          alert("Please select both schedule date and time");
          return;
      }

      const combinedDateTime = `${date}T${time}:00`;
      const localDateTime = new Date(combinedDateTime);
      const schedule_time = localDateTime.toISOString();

      const created_time = new Date().toISOString();

      const threads_user_id = "YOUR_THREADS_USER_ID"; // Replace with actual Threads user ID
      const status = "SCHEDULED";

      const threadData = {
          text: text,
          schedule_time: schedule_time,
          created_time: created_time,
          status: status,
          userId: userId,
          threadsUserId: threads_user_id,
      };

      const schedulerAPI = "http://localhost:8787/threads/schedule";

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
              // Clear the form
              $("#threadContent").val('');
              $("#date").val('');
              $("#appt").val('');
          },
          error: function (xhr, status, error) {
              console.error("Error:", error);
              alert("An error occurred while scheduling the thread.");
          },
      });
  });
});
