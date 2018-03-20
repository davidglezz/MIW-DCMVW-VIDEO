ffmpeg -i BigBuckBunny.avi -c:a libvorbis -b:a 128k -vn -f webm -dash 1 BigBuckBunny_audio_128k.webm && \
ffmpeg -i BigBuckBunny.avi -c:v libvpx-vp9 -s 160x90 -b:v 100k -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 -an -f webm -dash 1 BigBuckBunny_160x90_100k.webm && \
ffmpeg -i BigBuckBunny.avi -c:v libvpx-vp9 -s 320x180 -b:v 500k -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 -an -f webm -dash 1 BigBuckBunny_320x180_500k.webm && \
ffmpeg -i BigBuckBunny.avi -c:v libvpx-vp9 -s 640x360 -b:v 900k -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 -an -f webm -dash 1 BigBuckBunny_640x360_900k.webm && \
ffmpeg -i BigBuckBunny.avi -c:v libvpx-vp9 -s 1280x720 -b:v 1500k -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 -an -f webm -dash 1 BigBuckBunny_1280x720_1500k.webm && \
ffmpeg \
 -f webm_dash_manifest -i BigBuckBunny_160x90_100k.webm \
 -f webm_dash_manifest -i BigBuckBunny_320x180_500k.webm \
 -f webm_dash_manifest -i BigBuckBunny_640x360_900k.webm \
 -f webm_dash_manifest -i BigBuckBunny_1280x720_1500k.webm \
 -f webm_dash_manifest -i BigBuckBunny_audio_128k.webm \
 -c copy -map 0 -map 1 -map 2 -map 3 -map 4 \
 -f webm_dash_manifest \
 -adaptation_sets "id=0,streams=0,1,2,3 id=1,streams=4" \
 manifest.mpd
