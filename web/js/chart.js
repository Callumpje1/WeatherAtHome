window.addEventListener('load', function () {
    fetch('/php/temperature_location.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Add code to handle the JSON data here (e.g., creating a chart)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

