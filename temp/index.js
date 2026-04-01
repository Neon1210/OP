import { loadPeopleData } from "./data.js";

const grid = document.getElementById("people-grid");

function createPersonCard(person) {
  const link = document.createElement("a");
  link.className = "person-card";
  link.href = `person.html?person=${encodeURIComponent(person.id)}`;
  link.setAttribute("aria-label", `Open ${person.name} videos`);

  const carousel = document.createElement("div");
  carousel.className = "carousel";

  person.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${person.name} photo ${index + 1}`;
    img.className = "carousel-image";
    if (index === 0) img.classList.add("active");
    carousel.appendChild(img);
  });

  const overlay = document.createElement("div");
  overlay.className = "person-overlay";
  overlay.innerHTML = `
    <strong>${person.name}</strong>
    <span>${person.videos.length} videos</span>
  `;

  link.appendChild(carousel);
  link.appendChild(overlay);

  // Auto-advance each card's image carousel every 3 seconds.
  let currentIndex = 0;
  const images = carousel.querySelectorAll(".carousel-image");
  setInterval(() => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }, 3000);

  return link;
}

async function init() {
  const peopleData = await loadPeopleData();

  peopleData.forEach((person) => {
    grid.appendChild(createPersonCard(person));
  });
}

init();
