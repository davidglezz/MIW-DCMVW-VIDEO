const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

// Esto representa, de forma simplificada y a modo ejemplo, una api de videos. 
const db = [
  {
    videoId: 1,
    name: "Big Buck Bunny",
    url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    subtitle: {
      label: "Ejemplo",
      srclang: "en",
      src: "/assets/video/Big Buck Bunny.vtt"
    }
  },
  {
    videoId: 2,
    name: "Toy helicopter",
    url: "http://techslides.com/demos/sample-videos/small.mp4"
  },
  {
    videoId: 3,
    name: "Toy Story",
    url: "http://www.html5videoplayer.net/videos/toystory.mp4"
  },
  {
    videoId: 4,
    name: "Star trails",
    url: "http://mirrors.standaloneinstaller.com/video-sample/star_trails.mp4"
  },
]

app.get('/playlist', (req, res) => {
  res.send(db)
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log("Running"));
