// ---- PASTE YOUR API KEY HERE ----
const API_KEY = '28663bec13af9d57172e4d0fe6b724d5';

// ---- SELECTORS ----
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-msg');
const loading = document.getElementById('loading');

// ---- SEARCH ON BUTTON CLICK ----
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

// ---- SEARCH ON ENTER KEY ----
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

// ---- FETCH WEATHER FROM API ----
async function getWeather(city) {
  // Show loading, hide everything else
  loading.classList.remove('hidden');
  weatherCard.classList.add('hidden');
  errorMsg.classList.add('hidden');

  try {
    // This is the API call
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // If city not found
    if (!response.ok) {
      throw new Error('City not found');
    }

    // Convert response to JSON
    const data = await response.json();

    // Show the weather data
    displayWeather(data);

  } catch (error) {
    // Show error message
    loading.classList.add('hidden');
    errorMsg.classList.remove('hidden');
  }
}

// ---- DISPLAY WEATHER DATA ----
function displayWeather(data) {
  loading.classList.add('hidden');
  weatherCard.classList.remove('hidden');

  // Fill in all the data
  document.getElementById('city-name').textContent =
    `${data.name}, ${data.sys.country}`;

  document.getElementById('temperature').textContent =
    `${Math.round(data.main.temp)}°C`;

  document.getElementById('description').textContent =
    data.weather[0].description;

  document.getElementById('humidity').textContent =
    `${data.main.humidity}%`;

  document.getElementById('wind-speed').textContent =
    `${Math.round(data.wind.speed * 3.6)} km/h`;

  document.getElementById('visibility').textContent =
    `${(data.visibility / 1000).toFixed(1)} km`;

  document.getElementById('pressure').textContent =
    `${data.main.pressure} hPa`;

  // Weather icon from API
  const iconCode = data.weather[0].icon;
  document.getElementById('weather-icon').src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Format date
  const date = new Date();
  document.getElementById('date').textContent =
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
}