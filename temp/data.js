export const samplePeopleData = [
  {
    id: "person-1",
    name: "Person 1",
    images: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
    ],
    videos: [
      {
        title: "Nature Walk",
        thumbnail:
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80",
        sources: [
          {
            label: "MP4",
            type: "video/mp4",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
          },
          {
            label: "WebM",
            type: "video/webm",
            src: "https://www.w3schools.com/html/mov_bbb.webm",
          },
        ],
      },
      {
        title: "City Timelapse",
        thumbnail:
          "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=900&q=80",
        sources: [
          {
            label: "MP4",
            type: "video/mp4",
            src: "https://www.w3schools.com/html/movie.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "person-2",
    name: "Person 2",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=1200&q=80",
    ],
    videos: [
      {
        title: "Mountain Clip",
        thumbnail:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        sources: [
          {
            label: "MP4",
            type: "video/mp4",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
          },
          {
            label: "WebM",
            type: "video/webm",
            src: "https://www.w3schools.com/html/mov_bbb.webm",
          },
        ],
      },
      {
        title: "Ocean Drone",
        thumbnail:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
        sources: [
          {
            label: "MP4",
            type: "video/mp4",
            src: "https://www.w3schools.com/html/movie.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "person-3",
    name: "Person 3",
    images: [
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508973379184-7517410fb0f4?auto=format&fit=crop&w=1200&q=80",
    ],
    videos: [
      {
        title: "Forest Path",
        thumbnail:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
        sources: [
          {
            label: "MP4",
            type: "video/mp4",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
          },
          {
            label: "WebM",
            type: "video/webm",
            src: "https://www.w3schools.com/html/mov_bbb.webm",
          },
        ],
      },
      {
        title: "Desert Ride",
        thumbnail:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        sources: [
          {
            label: "MP4",
            type: "video/mp4",
            src: "https://www.w3schools.com/html/movie.mp4",
          },
        ],
      },
    ],
  },
];

const DEFAULT_CONTENT_PATH = "./content/people.json";

export async function loadPeopleData(contentPath = DEFAULT_CONTENT_PATH) {
  try {
    const response = await fetch(contentPath, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Unable to load content file: ${response.status}`);
    }

    const payload = await response.json();
    const people = Array.isArray(payload?.people) ? payload.people : [];

    if (people.length === 0) {
      return samplePeopleData;
    }

    return people;
  } catch {
    return samplePeopleData;
  }
}
