
// Array to store weather card data
const weatherCards = [];

// Function to create a weather card and add it to the array
function createWeatherCard(location, temperature, humidity, conditions) {
    const cardHtml = `
  <div class="col-10 mt-2 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Weather in ${location}</h5>
        <p class="card-text">Temperature: ${temperature}</p>
        <p class="card-text">Humidity: ${humidity}</p>
        <p class="card-text">Conditions ${conditions}</p>
        <button class="btn btn-danger remove-card" data-location="${location}">Remove</button>
      </div>
    </div>
  </div>
`;

    // Add the card HTML to the container
    const cardContainer = document.getElementById('weatherCardContainer');
    cardContainer.innerHTML += cardHtml;

    // Add the card data to the array
    weatherCards.push({
        location,
        temperature,
        humidity,
    });
}

// Function to remove a weather card from the array and update the HTML
function removeWeatherCard(location) {
    // Find the index of the card with the specified location
    const index = weatherCards.findIndex((card) => card.location === location);

    if (index !== -1) {
        // Remove the card from the array
        weatherCards.splice(index, 1);

        // Update the HTML by removing the card with the matching location
        const cardToRemove = document.querySelector(`[data-location="${location}"]`);
        if (cardToRemove) {
            cardToRemove.closest('.card').remove();
        }
    }
}

// Function to fetch weather data and create a card
function fetchWeatherAndCreateCard(location) {
    const apiUrl = `http://api.iot.hva-robots.nl/weather/${location}/compact`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const temperatureCelsius = data.data.temp_C;
            const temperatureFahrenheit = data.data.temp_F;
            const humidity = data.data.humidity;
            const conditions = data.data.weatherDesc[0].value;

            // Create a weather card
            createWeatherCard(location, temperatureCelsius, temperatureFahrenheit, humidity, conditions);

        })
        .catch((error) => {
            alert("Fill in a valid location");
            console.error('Error fetching weather data:', error);
        });
}

// Event listener for the "Add Location" button
const addLocationButton = document.querySelector('.btn-success');
addLocationButton.addEventListener('click', function () {
    const locationInput = document.querySelector('.form-control');
    const location = locationInput.value;

    // Check if the location input is not empty
    if (location.trim() !== '') {
        fetchWeatherAndCreateCard(location);
        locationInput.value = ''; // Clear the input field after adding
    } else {
        alert("Fill in a valid location")
    }
});

// Event listener for removing cards
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-card')) {
        const location = e.target.getAttribute('data-location');
        removeWeatherCard(location);
    }
});

