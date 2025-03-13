const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

let allProphets = [];

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    allProphets = data.prophets;
    displayProphets(allProphets);
}

const displayProphets = (prophets) => {
    cards.innerHTML = '';

    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        const orderSuffix = getOrderSuffix(prophet.order);

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${prophet.order}${orderSuffix} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

function getOrderSuffix(order) {
    if (order === 1) return 'st';
    if (order === 2) return 'nd';
    if (order === 3) return 'rd';
    return 'th';
}

function filterUtah() {
    const filtered = allProphets.filter(prophet => prophet.birthplace === 'Utah');
    displayProphets(filtered);
}

function filterOutsideUSA() {
    const usaStates = ['Utah', 'Vermont', 'Ohio', 'Missouri', 'Idaho', 'Connecticut'];
    const filtered = allProphets.filter(prophet => !usaStates.includes(prophet.birthplace));
    displayProphets(filtered);
}

function filterOlder95() {
    const filtered = allProphets.filter(prophet => {
        if (!prophet.death) return false;
        const birthYear = parseInt(prophet.birthdate.split(' ')[2]);
        const deathYear = parseInt(prophet.death.split(' ')[2]);
        const age = deathYear - birthYear;
        return age >= 95;
    });
    displayProphets(filtered);
}

function filterChildren10() {
    const filtered = allProphets.filter(prophet => prophet.numofchildren >= 10);
    displayProphets(filtered);
}

function filterPresident15() {
    const filtered = allProphets.filter(prophet => prophet.length >= 15);
    displayProphets(filtered);
}

function resetFilters() {
    displayProphets(allProphets);
}

getProphetData();
