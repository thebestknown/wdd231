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

async function getSpotlightMembers() {
  if (!spotlight1 || !spotlight2 || !spotlight3) {
    console.warn('Spotlight elements not found on this page.');
    return;
  }

  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    console.error("Error fetching spotlight members:", error);
  }
}

function displaySpotlights(members) {
  const spotlightMembers = members.filter(member => member.membership === 2 || member.membership === 3);
  const randomSpotlights = getRandomItems(spotlightMembers, 3);

  [spotlight1, spotlight2, spotlight3].forEach((spot, index) => {
    const member = randomSpotlights[index];
    if (spot && member) {
      spot.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership-level">${member.membership === 3 ? 'Gold' : 'Silver'} Member</p>
      `;
    }
  });
}

function getRandomItems(array, number) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, number);
}

getSpotlightMembers();
