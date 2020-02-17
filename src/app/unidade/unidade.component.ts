import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit {
  slideConfig = {
    slidesToShow: 1,
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
  constructor() {}

  ngOnInit() {}
}
