---
title: Thriendly
permalink: /join
---

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Redirect</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            // Get the URL parameters
            var params = new URLSearchParams(window.location.search);
            // Check if the 'ref' parameter exists
            if (params.has('ref')) {
                var refValue = params.get('ref'); // Get the value of 'ref'
                // Redirect to the Gumroad URL with the same 'ref' value
                window.location.href = "https://gumroad.com/a/" + refValue;
            } else {
                window.location.href = "https://thriendly.com";
            }
        });
    </script>
</head>

<body>
    <h3>Redirecting to <a href="https://thriendly.com/">Thriendly</a> ...</h3>
</body>

</html>