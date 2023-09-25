window.addEventListener('load', function () {
    fetch('/web/php/testdata.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').innerHTML = data.location;
            document.getElementById('temperature').innerHTML = data.temperature;
            document.getElementById('conditions').innerHTML = data.conditions;
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    datasets: [{
                        label: 'Temperature',
                        data: data.temperature,
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
        });
});
const ctx = document.getElementById('temperature-chart');

window.addEventListener('load', function () {
    fetch('/web/php/database.php').then(data => {
        console.log(data)
    })
})