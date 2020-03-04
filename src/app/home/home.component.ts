import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      }
    ]
  };

  slickNewsConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    dots: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false
        }
      }
    ]
  };

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.isLoading = true;

    //this.getLocation();
  }
}
