const addButton = document.getElementById('addButton');

fetchAllLocations();

// Function to fetch weather data from the API
async function fetchWeatherData(location) {
    try {
        const response = await fetch(`http://api.iot.hva-robots.nl/weather/${location}/compact`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}
// Keep track of added locations
const addedLocations = new Array();

// Function to fetch weather data from the API
async function fetchAllLocations() {
    const weatherCards = document.getElementById('weather-cards'); // Get the container for weather cards

    fetch('/php/get_location.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const { locationId, name, temperature, humidity, observation_time, conditions, precipitation } = element;

                if (!addedLocations.includes(name)) {
                    // Create a weather card for each location retrieved from the database
                    const card = createWeatherCard(locationId, name, temperature, humidity, observation_time, conditions, precipitation);

                    // Add the weather card to the frontend
                    weatherCards.appendChild(card);

                    // Add the location to the set to mark it as added
                    addedLocations.push(name);
                }
            });
        })
}

// Rest of your code (addButton event listener, fetchWeatherData, addWeatherCard, etc.)



// Function to add a weather card to the frontend and local storage
function addWeatherCard(locationId, location, temperature, humidity, observation_time, weatherDesc, precipMM) {
    const weatherCards = document.getElementById('weather-cards');
    const card = createWeatherCard(locationId, location, temperature, humidity, observation_time, weatherDesc, precipMM);

    weatherCards.appendChild(card);
}

// Function to calculate background gradient class based on temperature
function calculateBackgroundGradient(temperature) {
    if (temperature < 0) {
        return 'bg-primary bg-gradient bg-opacity-25'; // Very Cold (below 0°C)
    } else if (temperature < 10) {
        return 'bg-info bg-gradient bg-opacity-25'; // Cold (0°C to 10°C)
    } else if (temperature < 20) {
        return 'bg-success bg-gradient bg-opacity-25'; // Cool (10°C to 20°C)
    } else if (temperature < 30) {
        return 'bg-warning bg-gradient bg-opacity-25'; // Warm (20°C to 30°C)
    } else if (temperature < 40) {
        return 'bg-danger bg-gradient bg-opacity-25'; // Hot (30°C to 40°C)
    } else {
        return 'bg-dark bg-gradient bg-opacity-25'; // Very Hot (above 40°C)
    }
}

function createWeatherCard(locationId, location, temperature, humidity, observation_time, weatherDesc, precipMM) {
    // Calculate the background color based on the temperature
    const backgroundColor = calculateBackgroundGradient(temperature);

    // Create the card element
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
      <div class="card shadow-m col-10 mt-3 ${backgroundColor}">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <h1>${temperature}&deg;C</h1>
              <h4>${location}</h4>
              <p>Humidity: ${humidity}%</p>
              </div>
            <div class="col-6 text-end">
              <p>Conditions: ${weatherDesc}</p>
              <p>Precipitation: ${precipMM} mm</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
            <p style="font-weight:200">Last updated: ${observation_time}</p>
            </div>
            <div class="col-6 text-end">
              <button class="btn btn-danger delete-button" data-location="${location}" data-id="${locationId}">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
    // Find the "Remove" button inside the card and attach a click event listener
    const removeButton = card.querySelector('.delete-button');

    removeButton.addEventListener('click', () => {
        const locationId = removeButton.getAttribute('data-id');
        removeWeatherCard(location, locationId);
    });

    return card;
}

function removeWeatherCard(location, locationId) {
    if (confirm(`Are you sure you want to remove ${location}?`)) {
        const card = document.querySelector(`.weather-card[data-id="${locationId}"]`);
        console.log(card)
        if (card) {
            // Remove the card from the frontend
            card.remove();

            // Make an AJAX request to delete the location from the database
            fetch('php/post_location.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ locationId: locationId }),
            })
                .then(response => {
                    if (response.ok) {
                        addedLocations.splice(addedLocations.indexOf(locationId), 1);
                        console.log(`Location with ID ${locationId} has been successfully removed from the database.`);
                    } else {
                        console.error(`Failed to remove location with ID ${locationId} from the database.`);
                    }
                })
                .catch(error => {
                    console.error('Error while making the AJAX request:', error);
                });
        }
    }
}





addButton.addEventListener('click', async () => {
    const locationInput = document.getElementById('locationValue');
    const location = locationInput.value.trim().toLowerCase();


    // Check if the location is already in the addedLocations Set
    if (addedLocations.includes(location)) {
        alert("Location already exists.");
    } else {
        const weatherData = await fetchWeatherData(location);

        const data = {
            location: location,
            temperature: weatherData.data.FeelsLikeC,
            humidity: weatherData.data.humidity,
            observation_time: weatherData.data.observation_time,
            weatherDesc: weatherData.data.weatherDesc[0].value,
            precipMM: weatherData.data.precipMM
        };

        if (weatherData) {
            fetch('/php/post_location.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            addWeatherCard(
                location,
                weatherData.data.FeelsLikeC,
                weatherData.data.humidity,
                weatherData.data.observation_time,
                weatherData.data.weatherDesc[0].value,
                weatherData.data.precipMM
            );
            locationInput.value = ''; // Clear the input field

            addedLocations.push(location);
        } else {
            console.log("No weather data found for " + location);
        }
    }
});


