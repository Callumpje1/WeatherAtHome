
const ctx = document.getElementById('temperature-chart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Temperature',
            data: [2, 3, 4, 5, 7, 8],
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