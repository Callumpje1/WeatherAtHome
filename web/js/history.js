
// Array to store weather card data
let weatherCards = [];

// Function to create a weather card and add it to the array
function createWeatherCard(location, temperature, humidity, weatherConditionCode) {
    let cardClass;
    if (temperature <= 10) {
        cardClass = 'card-cold';
    } else if (temperature >= 30) {
        cardClass = 'card-hot';
    } else {
        cardClass = 'card-moderate';
    }

    // Create an object to map weather condition codes to SVG icons
    const weatherIcons = {
        '116': '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><path d="M25 2C12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23S37.683 2 25 2zm0 43C13.868 45 3 34.132 3 23S13.868 3 25 3s22 10.868 22 20-10.868 22-22 22zm0-40C14.169 5 5 14.169 5 25s9.169 20 20 20 20-9.169 20-20S35.831 5 25 5zm-1 4.999v19h-2v-19h2zm1.001 28.001a2 2 0 1 1-.001-4.001 2 2 0 0 1 .001 4.001z"/></svg>',
        // Add more weather condition codes and corresponding SVG icons as needed
    };

    const weatherIconSvg = weatherIcons[weatherConditionCode] || ''; // Use an empty string if no icon found

    const cardHtml = `
    <div class="col-md-10 mt-3">
      <div class="card ${cardClass}">
        <div class="card-body">
          <h5 class="card-title">Weather in ${location}</h5>
          <p class="card-text">Temperature: ${temperature}°C</p>
          <p class="card-text">Humidity: ${humidity}%</p>
          <div class="weather-icon">${weatherIconSvg}</div>
          <button class="btn btn-danger remove-card" data-location="${location}">Remove</button>
        </div>
      </div>
    </div>
  `;

    // Clear existing HTML in the container
    const cardContainer = document.getElementById('weatherCardContainer');

    // Add the card HTML to the container
    cardContainer.innerHTML += cardHtml;

    // Add the card data to the array
    weatherCards.push({
        location,
        temperature,
        humidity,
    });

    // Save the updated array to local storage
    localStorage.setItem('weatherCards', JSON.stringify(weatherCards));
}

console.log("array:" + weatherCards);
console.log("local" + localStorage.weatherCards);

function removeWeatherCard(location) {
    console.log('Removing card for location:', location); // Debugging
    // Find the index of the card with the specified location
    const index = weatherCards.findIndex((card) => card.location === location);
    console.log('Index:', index); // Debugging

    if (index !== -1) {
        // Remove the card from the array
        weatherCards.splice(index, 1);

        // Update the HTML by removing the card with the matching location
        const cardToRemove = document.querySelector(`[data-location="${location}"]`);



        if (cardToRemove) {
            localStorage.removeItem(location)
        }

        // Save the updated array to local storage
        localStorage.setItem('weatherCards', JSON.stringify(weatherCards));
    }
}


// Function to fetch weather data and create a card
// Keep track of pending fetch requests
const pendingFetchRequests = {};

function fetchWeatherAndCreateCard(location) {
    const apiUrl = `http://api.iot.hva-robots.nl/weather/${location}/compact`;

    // Check if a fetch request is already pending for this location
    if (pendingFetchRequests[location]) {
        return; // If pending, do not make another request
    }

    // Set a flag to indicate a pending fetch request
    pendingFetchRequests[location] = true;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Once the request is complete, remove the flag
            delete pendingFetchRequests[location];

            const temperature = data.data.temp_C;
            const humidity = data.data.humidity;
            const weatherConditionCode = data.data.weatherCode;

            // Check if the card for this location already exists
            const existingCardIndex = weatherCards.findIndex((card) => card.location === location);

            if (existingCardIndex === -1) {
                // Create a weather card if it doesn't exist
                createWeatherCard(location, temperature, humidity, weatherConditionCode);
            } else {
                alert("This location card already exists.");
            }
        })
        .catch((error) => {
            // Once the request is complete or if there's an error, remove the flag
            delete pendingFetchRequests[location];

            alert("Fill in a valid location");
            console.error('Error fetching weather data:', error);
        });
}

//localStorage.clear();
//weatherCards = [];


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
        alert("Location can't be empty");
    }

    console.log(localStorage.weatherCards)
});

// Event listener for removing cards
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-card')) {
        const location = e.target.getAttribute('data-location');
        removeWeatherCard(location);
    }
});

// Load weather cards from local storage when the page is loaded
window.addEventListener('load', function () {
    const storedCards = localStorage.getItem('weatherCards');
    if (storedCards) {
        const storedWeatherCards = JSON.parse(storedCards);

        // Iterate over stored cards and add only unique locations to the array
        storedWeatherCards.forEach((storedCardData) => {
            const existingCardIndex = weatherCards.findIndex((card) => card.location === storedCardData.location);

            if (existingCardIndex === -1) {
                weatherCards.push(storedCardData);
            }
        });

        // Loop through the unique stored cards and create them on the page
        weatherCards.forEach((cardData) => {
            createWeatherCard(cardData.location, cardData.temperature, cardData.humidity);
        });
    }
});
