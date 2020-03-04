import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnidadesService } from './unidades.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  unidade: any;

  constructor(
    private route: ActivatedRoute,
    private unidadesService: UnidadesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getUnidade();
  }

  getUnidade() {
    const slug = this.route.snapshot.params.slug;
    this.spinner.show();
    this.unidadesService.getUnidade(slug).subscribe(
      response => {
        this.unidade = response;
        this.spinner.hide();
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }
}
