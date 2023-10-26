const addButton = document.getElementById('addButton');

fetchAllLocations();

const addedLocations = new Array();

// Fetch weather data from the HvA Weather API
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

// Fetch weather data from the Php server and append card
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


// Add a weather card to the frontend
function addWeatherCard(locationId, location, temperature, humidity, observation_time, weatherDesc, precipMM) {
    const weatherCards = document.getElementById('weather-cards');

    const card = createWeatherCard(locationId, location, temperature, humidity, observation_time, weatherDesc, precipMM);

    weatherCards.appendChild(card);
}

// Calculate background gradient class based on temperature
function addCardStyling(temperature) {
    if (temperature < 0) {
        return 'border-primary border-2'; // Very Cold (below 0°C)
    } else if (temperature < 10) {
        return 'border-info border-2'; // Cold (0°C to 10°C)
    } else if (temperature < 20) {
        return 'border-success border-2'; // Cool (10°C to 20°C)
    } else if (temperature < 30) {
        return 'border-warning border-2'; // Warm (20°C to 30°C)
    } else if (temperature < 40) {
        return 'border-danger border-2'; // Hot (30°C to 40°C)
    } else {
        return 'border-dark border-2'; // Very Hot (above 40°C)
    }
}

// Create html card with location data from php server
function createWeatherCard(locationId, location, temperature, humidity, observation_time, weatherDesc, precipMM) {
    const backgroundColor = addCardStyling(temperature);
    // Create the card element
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
          <div class="card shadow-sm col-10 mt-3 ${backgroundColor}">
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
                  <button class="btn btn-danger delete-button" data-id="${locationId}">Remove</button>
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

// Remove weather card with given id from server and frontend
function removeWeatherCard(location, locationId) {
    if (confirm(`Are you sure you want to remove ${location}?`)) {
        const deleteButton = document.querySelector(`.delete-button[data-id="${locationId}"]`);
        if (deleteButton) {
            const card = deleteButton.closest('.weather-card'); // Find the parent card element
            if (card) {
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
                            card.remove();
                            addedLocations.splice(addedLocations.indexOf(locationId), 1);
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
}

// Add location card to frontend with location data from server
addButton.addEventListener('click', async () => {
    const locationInput = document.getElementById('locationValue');

    const location = locationInput.value.trim().toLowerCase();

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

        fetch('/php/post_location.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error(`Failed to add location ${location} to the database.`);
                }
            })
            .then(responseData => {
                if (responseData) {
                    const locationId = responseData.locationId;
                    addWeatherCard(locationId, location, weatherData.data.FeelsLikeC, weatherData.data.humidity, weatherData.data.observation_time, weatherData.data.weatherDesc[0].value, weatherData.data.precipMM);
                    locationInput.value = '';
                    addedLocations.push(location);
                }
            })
            .catch(error => {
                console.error('Error while adding location to the database:', error);
            });
    }
});




