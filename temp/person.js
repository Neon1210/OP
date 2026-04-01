import { loadPeopleData } from "./data.js";

const params = new URLSearchParams(window.location.search);
const personId = params.get("person");

const title = document.getElementById("person-title");
const videoList = document.getElementById("video-list");
const player = document.getElementById("player");
const speedControl = document.getElementById("speed-control");
const formatControl = document.getElementById("format-control");

const state = {
  selectedVideoIndex: 0,
  selectedFormatLabel: null,
};

function renderFormatOptions(video) {
  formatControl.innerHTML = "";

  video.sources.forEach((source, index) => {
    const option = document.createElement("option");
    option.value = source.label;
    option.textContent = source.label;

    if (state.selectedFormatLabel === null && index === 0) {
      state.selectedFormatLabel = source.label;
    }

    if (source.label === state.selectedFormatLabel) {
      option.selected = true;
    }

    formatControl.appendChild(option);
  });
}

function loadCurrentVideo({ autoplay = false } = {}) {
  if (!person.videos.length) {
    player.removeAttribute("src");
    player.load();
    formatControl.innerHTML = "";
    return;
  }

  const video = person.videos[state.selectedVideoIndex];
  renderFormatOptions(video);

  const selectedSource =
    video.sources.find((src) => src.label === state.selectedFormatLabel) ||
    video.sources[0];

  state.selectedFormatLabel = selectedSource.label;

  player.src = selectedSource.src;
  player.type = selectedSource.type;
  player.load();

  if (autoplay) {
    player.play().catch(() => {
      // Autoplay may be blocked by browser policies.
    });
  }
}

function renderVideoList() {
  videoList.innerHTML = "";

  if (!person.videos.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-text";
    emptyState.textContent = "No videos added yet for this person.";
    videoList.appendChild(emptyState);
    return;
  }

  person.videos.forEach((video, index) => {
    const button = document.createElement("button");
    button.className = "video-item";
    button.type = "button";
    button.dataset.index = String(index);

    const thumb = document.createElement("img");
    thumb.src = video.thumbnail;
    thumb.alt = `${video.title} thumbnail`;

    const text = document.createElement("div");
    text.className = "video-meta";
    text.innerHTML = `<strong>${video.title}</strong><span>${video.sources
      .map((s) => s.label)
      .join(" / ")}</span>`;

    button.appendChild(thumb);
    button.appendChild(text);

    if (index === state.selectedVideoIndex) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      state.selectedVideoIndex = index;
      state.selectedFormatLabel = person.videos[index].sources[0].label;
      renderVideoList();
      loadCurrentVideo({ autoplay: true });
    });

    videoList.appendChild(button);
  });
}

speedControl.addEventListener("change", () => {
  player.playbackRate = Number(speedControl.value);
});

formatControl.addEventListener("change", () => {
  state.selectedFormatLabel = formatControl.value;
  loadCurrentVideo({ autoplay: true });
});

let person = null;

async function init() {
  const peopleData = await loadPeopleData();
  person = peopleData.find((item) => item.id === personId) || peopleData[0];

  title.textContent = `${person.name} Videos`;
  renderVideoList();
  loadCurrentVideo();
}

init();
