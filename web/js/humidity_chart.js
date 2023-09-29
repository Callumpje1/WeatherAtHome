
const ctf = document.getElementById('humidity-chart');

new Chart(ctf, {
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
                text: 'Historic Humidity'
            }
        }
    }
});
