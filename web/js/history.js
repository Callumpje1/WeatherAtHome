const tempChart = document.getElementById('temperature-chart');
const humidityChart = document.getElementById('humidity-chart');
const homeTemp = document.getElementById('homeTemperature');
const homeHumidity = document.getElementById('homeHumidity');

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

function extractAverageHumidity(data) {
    return data.map(item => item.averageHumidity);
}

function plotHistoricTemperatureChart() {
    window.addEventListener('load', function () {
        fetch('/php/get_average_climate.php')
            .then(response => response.json())
            .then(data => {
                homeTemp.innerHTML = data[0].averageTemperature + "*C"
                const dayLabels = extractDayLabels(data);
                const averageTemperatures = extractAverageTemperatures(data);
                new Chart(tempChart, {
                    type: 'line',
                    data: {
                        labels: dayLabels,
                        datasets: [{
                            label: 'Temperature',
                            lineTension: 0.3,
                            data: averageTemperatures,
                            borderColor: "#027d0d",
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                            }
                        }
                    }
                });
            })
    });
}

function plotHistoricHumidityChart() {
    window.addEventListener('load', function () {
        fetch('/php/get_average_climate.php')
            .then(response => response.json())
            .then(data => {
                homeHumidity.innerHTML = data[0].averageHumidity + "%"
                const dayLabels = extractDayLabels(data);
                const averageHumidity = extractAverageHumidity(data);
                new Chart(humidityChart, {
                    type: 'line',
                    data: {
                        labels: dayLabels,
                        datasets: [{
                            label: 'Humidity',
                            lineTension: 0.3,
                            data: averageHumidity,
                            borderColor: "#2832ed",
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                            }
                        }
                    }
                });
            })
    });
}


plotHistoricHumidityChart();

plotHistoricTemperatureChart();
