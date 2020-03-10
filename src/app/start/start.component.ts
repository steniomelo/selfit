import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  @ViewChild('video', null) video: ElementRef;
  constructor() {}

  ngOnInit() {
    this.video.nativeElement.muted = true;
  }
}
