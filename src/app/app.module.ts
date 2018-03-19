import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { ListComponent } from './list/list.component';
import { Repository } from './models/repository';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [Repository],
  bootstrap: [AppComponent]
})
export class AppModule { }
