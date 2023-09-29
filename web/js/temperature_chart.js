const ctx = document.getElementById('temperature-chart');

window.addEventListener('load', function () {
    fetch('/php/api.php')
        //.then(response => response.json())
        .then(data => {
            console.log(data)
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    datasets: [{
                        label: 'Temperature',
                        data: 1,
                        borderColor: "#F93023",
                        backgroundColor: "#F93023",
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Historic Temperature'
                        }
                    }
                }
            });
        })
});