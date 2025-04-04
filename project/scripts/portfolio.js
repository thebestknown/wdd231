const galleryContainer = document.querySelector("#gallery");
const styleFilter = document.querySelector("#styleFilter");

async function loadArtworks() {
  try {
    const response = await fetch("data/artworks.json");
    const artworks = await response.json();

    displayGallery(artworks);

    styleFilter.addEventListener("change", () => {
      const selectedStyle = styleFilter.value;
      const filtered = selectedStyle === "all"
        ? artworks
        : artworks.filter(art => art.style === selectedStyle);
      displayGallery(filtered);
    });

  } catch (error) {
    console.error("Failed to load artworks:", error);
    galleryContainer.innerHTML = "<p>Error loading artworks. Please try again later.</p>";
  }
}

function displayGallery(artworks) {
  galleryContainer.innerHTML = "";

  if (artworks.length === 0) {
    galleryContainer.innerHTML = "<p>No artworks found for this style.</p>";
    return;
  }

  artworks.forEach(art => {
    const card = document.createElement("div");
    card.classList.add("art-card");

    const storedRating = localStorage.getItem(`rating-${art.id}`);
    const rating = storedRating ? parseFloat(storedRating) : art.rating;

    card.innerHTML = `
      <img src="${art.image}" alt="${art.title}" loading="lazy" class="art-image">
      <h3>${art.title}</h3>
      <p class="style">${art.style}</p>
      <p>${art.description}</p>
      <div class="stars" data-id="${art.id}">
        ${renderStars(rating)}
      </div>
      <p class="rating-text">Your Rating: <span id="rating-${art.id}">${rating}</span></p>
    `;

    galleryContainer.appendChild(card);
  });

  addRatingEvents();
  addModalEvents(); // ✅ Modal click events
}

loadArtworks();

function renderStars(rating) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? "filled" : "";
    starsHTML += `<span class="star ${starClass}" data-value="${i}">&#9733;</span>`;
  }
  return starsHTML;
}

function addRatingEvents() {
  const starsContainers = document.querySelectorAll(".stars");

  starsContainers.forEach(container => {
    const stars = container.querySelectorAll(".star");
    const artworkId = container.dataset.id;

    stars.forEach(star => {
      star.addEventListener("click", () => {
        const selectedRating = parseInt(star.dataset.value);
        localStorage.setItem(`rating-${artworkId}`, selectedRating);
        updateStars(container, selectedRating);
        document.querySelector(`#rating-${artworkId}`).textContent = selectedRating;
      });
    });
  });
}

function updateStars(container, rating) {
  const stars = container.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("filled", index < rating);
  });
}

const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
  navigation.classList.toggle('show');
  hamburger.classList.toggle('open');
});

document.getElementById("lastModified").textContent = document.lastModified;

function addModalEvents() {
  const modal = document.getElementById("artModal");
  const modalImg = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");

  document.querySelectorAll(".art-image").forEach(img => {
    img.addEventListener("click", () => {
      const card = img.closest(".art-card");
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = card.querySelector("h3").textContent;
      modalDesc.textContent = card.querySelector("p:nth-of-type(2)").textContent;
      modal.style.display = "block";
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
