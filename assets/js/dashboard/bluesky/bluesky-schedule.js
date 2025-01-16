$(document).ready(function () {
    let idToken = '';
    let userId = '';

        checkAuthAndExecute((user) => {
            user.getIdToken().then((token) => {
                idToken = token;
                userId = user.uid;

                const { platform } = getApiParams();
                fetchProfiles(userId, platform, idToken);
            });
        });

        $('#schedulerBackButton').on('click', function () {
            const threadContent = $("#threadContent").val().trim();

            if (threadContent.length > 0) {
                // Show confirmation dialog only if there is content in the text box
                if (confirm("Are you sure you want to go back? Any edits made to the post will be lost.")) {
                    window.location.href = '/app/bluesky/home'; // Redirect to the desired path
                }
            } else {
                // No content, directly navigate back
                window.location.href = '/app/bluesky/home';
            }
        });
    });