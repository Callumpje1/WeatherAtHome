const ctx = document.getElementById('temperature-chart');

function extractDayLabels(data) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return data.map(item => {
        const dateStr = new Date(item.date);
        const dayOfWeek = dateStr.getDay();
        return daysOfWeek[dayOfWeek];
    });
}

function extractAverageTemperatures(data) {
    return data.map(item => item.averageTemperature);
}

window.addEventListener('load', function () {
    fetch('/php/temperature_get.php')
        .then(response => response.json())
        .then(data => {
            const dayLabels = extractDayLabels(data);
            const averageTemperatures = extractAverageTemperatures(data);
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dayLabels,
                    datasets: [{
                        label: 'Temperature',
                        lineTension: 0.3,
                        data: averageTemperatures,
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
