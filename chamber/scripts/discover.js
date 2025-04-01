const messageElement = document.getElementById("visitMessage");
const lastVisit = Number(localStorage.getItem("lastVisit"));
const now = Date.now();
const msInDay = 86400000;

if (!lastVisit) {
  messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / msInDay);
  if (days < 1) {
    messageElement.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    messageElement.textContent = "You last visited 1 day ago.";
  } else {
    messageElement.textContent = `You last visited ${days} days ago.`;
  }
}
localStorage.setItem("lastVisit", now);

const container = document.getElementById("discoverCards");
fetch("data/discover.json")
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.gridArea = `card${index + 1}`;

      card.innerHTML = `
        <h3>${item.title}</h3>
        <figure>
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading discover data:", error));
