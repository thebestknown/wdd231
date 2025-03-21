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
  if (!membersContainer) {
    return;
  }

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

if (iconCode && iconsrc) {
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', description);
}
