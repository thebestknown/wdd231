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

    card.innerHTML = `
      <img src="${art.image}" alt="${art.title}" loading="lazy" class="art-image">
      <h3>${art.title}</h3>
      <p class="style">${art.style}</p>
      <p>${art.description}</p>
      <p class="rating">Rating: ⭐ ${art.rating}</p>
    `;

    galleryContainer.appendChild(card);
  });
}

loadArtworks();
