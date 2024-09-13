$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  const dateInput = document.getElementById("date");

  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  dateInput.setAttribute("min", currentDate);

  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 31);
  const maxDate = futureDate.toISOString().split("T")[0];

  dateInput.setAttribute("max", maxDate);
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("scheduleButton")
    .addEventListener("click", function () {
      const text = document.getElementById("threadContent").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("appt").value;
      const user_id = "aQzG1BOWzlbaVRVZ6Wq1NfgZvu22"; // Hard-coded
      const threads_user_id = "26317239004558600"; // Hard-coded
      const status = "SCHEDULED";

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

      const threadData = {
        text: text,
        schedule_time: schedule_time,
        created_time: created_time,
        status: status,
        userId: user_id,
        threadsUserId: threads_user_id,
      };

      const schedulerAPI =
        "https://scheduler.manigopalmurthy.workers.dev/threads/schedule";

      $.ajax({
        url: schedulerAPI,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(threadData),
        success: function (data) {
          console.log("Success:", data);
          alert("Thread scheduled successfully!");
        },
        error: function (error) {
          console.error("Error:", error);
          alert("An error occurred while scheduling the thread.");
        },
      });
    });
});
