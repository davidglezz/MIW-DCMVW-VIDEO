import { Component, OnInit } from '@angular/core';
import { Repository } from "../models/repository";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public repo: Repository) { }

  ngOnInit() {
  }

  selectVideo(id: number) {
    this.repo.selectVideo(id);
  }

}
