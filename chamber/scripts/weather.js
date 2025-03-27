const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const day1 = document.querySelector('#day1');
const day2 = document.querySelector('#day2');
const day3 = document.querySelector('#day3');

const spotlight1 = document.getElementById('spotlight1');
const spotlight2 = document.getElementById('spotlight2');
const spotlight3 = document.getElementById('spotlight3');

const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=-1.0286&lon=-79.4635&units=metric&appid=957f0e935ecbf795d104357ab9550562';

async function apiFetch() {
  if (!currentTemp || !weatherIcon || !captionDesc || !day1 || !day2 || !day3) {
    console.warn('Weather elements not found on this page.');
    return;
  }

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  const currentTemperature = data.list[0].main.temp.toFixed(0);
  const description = capitalizeWords(data.list[0].weather[0].description);
  const iconCode = data.list[0].weather[0].icon;
  const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  currentTemp.innerHTML = `${currentTemperature}&deg;C`;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', description);
  captionDesc.textContent = description;

  day1.innerHTML = `${Math.round(data.list[8].main.temp)}&deg;C`;
  day2.innerHTML = `${Math.round(data.list[16].main.temp)}&deg;C`;
  day3.innerHTML = `${Math.round(data.list[24].main.temp)}&deg;C`;
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

apiFetch();

const humidityEl = document.getElementById('humidity');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');

async function fetchCurrentWeather() {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=-1.0286&lon=-79.4635&units=metric&appid=957f0e935ecbf795d104357ab9550562');
    if (!response.ok) throw new Error('Error fetching current weather');

    const data = await response.json();

    const humidity = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (humidityEl) humidityEl.textContent = humidity;
    if (sunriseEl) sunriseEl.textContent = sunrise;
    if (sunsetEl) sunsetEl.textContent = sunset;
  } catch (error) {
    console.error('Error fetching current weather:', error);
  }
}

fetchCurrentWeather();
