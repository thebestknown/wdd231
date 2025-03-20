const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

const menuButton = document.getElementById("menu");
const navUl = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navUl.classList.toggle("show");
});

const membersContainer = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = ''; 

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visitar Sitio Web</a>
        `;

        membersContainer.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid');
    membersContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list');
    membersContainer.classList.remove('grid');
});

getMembers();

const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const day1 = document.querySelector('#day1');
const day2 = document.querySelector('#day2');
const day3 = document.querySelector('#day3');

const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&units=metric&appid=957f0e935ecbf795d104357ab9550562';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    const currentTempValue = Math.round(data.list[0].main.temp);
    const description = data.list[0].weather.map(item => capitalize(item.description)).join(', ');

    currentTemp.innerHTML = `${currentTempValue}°C`;
    weatherDesc.innerHTML = description;

    day1.innerHTML = `${Math.round(data.list[1].main.temp)}°C`;
    day2.innerHTML = `${Math.round(data.list[2].main.temp)}°C`;
    day3.innerHTML = `${Math.round(data.list[3].main.temp)}°C`;
}

function capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

apiFetch();

const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlightMembers() {
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

    randomSpotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">${member.membership === 3 ? 'Gold' : 'Silver'} Member</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

function getRandomItems(array, number) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, number);
}

getSpotlightMembers();
