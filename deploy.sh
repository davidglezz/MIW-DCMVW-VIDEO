docker build --rm -t video .
docker create --name appvideo -p 8010:8010 video
docker start appvideo
