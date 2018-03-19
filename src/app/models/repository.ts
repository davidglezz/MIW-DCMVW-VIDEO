import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Video } from "./video.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class Repository {
    videos: Video[] = [];
    currentVideo: Video;

    constructor(public http: HttpClient) {
        this.getVideos();
    }

    getVideos() {        
        this.http.get('/playlist').subscribe(videos => {
            this.videos = videos as Video[];
            this.currentVideo = this.videos[0];
        });
    }

    selectVideo(id: number)  {
        this.currentVideo = this.videos.find(item => item.videoId == id);
    }

}
