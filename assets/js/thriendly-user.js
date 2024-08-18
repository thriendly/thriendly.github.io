// const apiUrlFetchUser = `http://127.0.0.1:12345/users?userId=`;
// const apiUrlGenerateKey = `http://127.0.0.1:12345/keys/generate`;
const apiUrlFetchUser = `https://composer.manigopalmurthy.workers.dev/users?userId=`;
const apiUrlGenerateKey = `https://composer.manigopalmurthy.workers.dev/keys/generate`;

// Function to fetch user data and execute a callback on success
function fetchUserDataAndPopulateApiKey(userId, onSuccessCallback) {
  $.ajax({
    url: `${apiUrlFetchUser}${userId}`,
    type: "GET",
    success: function (response) {
      if (typeof onSuccessCallback === "function") {
        onSuccessCallback(response);
      }
      $("#loading").hide();
    },
    error: function (error) {
      console.error("Error fetching user data:", error);
      $("#loading").hide();
    },
  });
}

function generateAPIKey(idToken, onSuccessCallback) {
  const payload = {
    userToken: idToken,
  };

  $.ajax({
    url: apiUrlGenerateKey,
    type: "POST",
    dataType: "json",
    data: JSON.stringify(payload),
    success: function (response) {
      if (typeof onSuccessCallback === "function") {
        onSuccessCallback(response);
      }
    },
    error: function (error) {
      console.error("Error generating key:", error);
    },
  });
}
