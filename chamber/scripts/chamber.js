const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

const hamburgerButton = document.querySelector('.hamburger');
const navigationMenu = document.querySelector('.navigation');

if (hamburgerButton && navigationMenu) {
  hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('open');
    navigationMenu.classList.toggle('show');
  });
}

const membersContainer = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function getMembers() {
  if (!membersContainer) return;

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

if (gridBtn && listBtn && membersContainer) {
  gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid');
    membersContainer.classList.remove('list');
  });

  listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list');
    membersContainer.classList.remove('grid');
  });

  getMembers();
}

const spotlight1 = document.getElementById('spotlight1');
const spotlight2 = document.getElementById('spotlight2');
const spotlight3 = document.getElementById('spotlight3');

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

if (document.getElementById('spotlight1') && document.getElementById('spotlight2') && document.getElementById('spotlight3')) {
  getSpotlightMembers();
}
