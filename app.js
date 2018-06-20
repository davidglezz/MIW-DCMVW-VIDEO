const express = require('express');
const http = require('http');
const path = require('path');

// Esto equivale, a modo ejemplo, a una base de datos de videos.
const db = [
  {
    videoId: 1,
    name: "Big Buck Bunny Subtitles",
    url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    subtitles: [{
      label: "Español",
      srclang: "es",
      src: "/assets/video/BigBuckBunny_es.vtt"
    },
    {
      label: "Ingles",
      srclang: "en",
      src: "/assets/video/BigBuckBunny_en.vtt"
    }]
  },
  {
    videoId: 2,
    name: "Big Buck Bunny DASH",
    url: "/assets/video/manifest.mpd",
  },
  {
    videoId: 3,
    name: "Toy helicopter",
    url: "http://techslides.com/demos/sample-videos/small.mp4"
  },
  {
    videoId: 4,
    name: "Toy Story",
    url: "http://www.html5videoplayer.net/videos/toystory.mp4"
  },
  {
    videoId: 5,
    name: "Star trails",
    url: "http://mirrors.standaloneinstaller.com/video-sample/star_trails.mp4"
  },
]

const app = express();

// "API"
app.get('/playlist', (req, res) => {
  res.send(db)
});

// Contenido estático
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '8010';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log("Running"));
