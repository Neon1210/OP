# People Video Gallery

A polished, deploy-ready website where:

- each person card shows an auto-moving photo carousel (every 3 seconds)
- hover reveals the person name
- clicking opens a dedicated videos page
- videos play in-browser with speed and format controls

## 1. Add Your Own People, Photos, and Videos

Edit this file:

- content/people.json

Each person object shape:

```json
{
  "id": "person-1",
  "name": "Person 1",
  "images": ["/media/person-1/photo-1.jpg", "/media/person-1/photo-2.jpg"],
  "videos": [
    {
      "title": "My Video",
      "thumbnail": "/media/person-1/thumb-1.jpg",
      "sources": [
        {
          "label": "MP4",
          "type": "video/mp4",
          "src": "/media/person-1/video-1.mp4"
        },
        {
          "label": "WebM",
          "type": "video/webm",
          "src": "/media/person-1/video-1.webm"
        }
      ]
    }
  ]
}
```

Recommended folder layout:

- media/person-1/
- media/person-2/
- media/person-3/

You can use relative paths like /media/person-1/video-1.mp4 or full URLs from cloud storage/CDN.

## 2. Run Locally

Use any static server (modules + JSON fetch need HTTP, not direct file open):

```bash
cd /Users/parthmishra/Desktop/temp
python3 -m http.server 8080
```

Open:

- http://localhost:8080/index.html

## 3. Deploy (Fastest: Netlify)

Option A: Drag and drop

1. Go to Netlify Drop.
2. Drag the full project folder.
3. Your site goes live instantly.

Option B: Git-connected deploy

1. Push this folder to a GitHub repo.
2. In Netlify: Add new site from Git.
3. Build command: leave empty.
4. Publish directory: .

## 4. Deploy (Vercel)

1. Push folder to GitHub.
2. Import project in Vercel.
3. Framework preset: Other.
4. Build command: leave empty.
5. Output directory: .

## Notes

- Keep video formats in sources to enable format switching in the UI.
- Large videos should be hosted on CDN/object storage for better speed.
- If content/people.json is missing or invalid, the app falls back to built-in sample data.
