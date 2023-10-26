var slider = document.getElementById('slider');
var valueMin = document.getElementById('value-min');
var valueMax = document.getElementById('value-max');
var connect = slider.querySelectorAll('.noUi-connect');
var classes = ['c-1-color', 'c-2-color', 'c-3-color'];

// Initiate noUiSlider with min and max values
noUiSlider.create(slider, {
    start: [16, 25],
    step: 0.1,
    connect: [true, true, true],
    range: {
        'min': 0,
        'max': 40
    }
});

// Add corresponding class to slider part
for (var i = 0; i < connect.length; i++) {
    connect[i].classList.add(classes[i]);
}

// Update html values on slider change and post range to server
slider.noUiSlider.on('update', function (values, handle) {
    if (handle === 0) {
        valueMin.innerHTML = Number(values[0]).toFixed(1); // Format to one decimal place
    }
    if (handle === 1) {
        valueMax.innerHTML = Number(values[1]).toFixed(1); // Format to one decimal place
    }

    fetch('/php/get_range.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "minTemp": values[0], "maxTemp": values[1] }),
    });
});

