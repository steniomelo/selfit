import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UnidadesService } from './unidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidades-listar',
  templateUrl: './unidades.listar.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesListarComponent implements OnInit {
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

  unidades: any = [];

  constructor(
    private unidadesService: UnidadesService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.spinner.show();

    this.isLoading = true;
    this.startSearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.startSearch();
  }

  startSearch() {
    const uf = this.route.snapshot.params.uf;

    if (!uf) {
      this.getUnidades();
      this.getLocation();
    } else {
      if (Number(uf)) {
        this.getCep(Number(uf));
      } else {
        this.getUnidades(null, uf);
      }
    }
  }

  getLocation() {
    this.spinner.show();

    this.unidadesService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);

      this.unidades = [];

      const coord = {
        lat: pos.lat,
        lng: pos.lng
      };

      this.getUnidades(coord);
    });
  }

  getUnidades(coord?: any, uf?: any) {
    this.spinner.show();

    let params = new HttpParams();

    if (coord) {
      params = params.set('longitude', coord.lng);
      params = params.set('latitude', coord.lat);
    }

    if (uf) {
      params = params.set('estado', uf);
    }

    params = params.set('page', '1');
    params = params.set('perPage', '10');

    this.unidadesService.getUnidades(params).subscribe(
      response => {
        this.unidades = response;
        this.spinner.hide();
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }

  getCep(cep: number) {
    this.spinner.show();

    this.unidadesService.getCep(cep).subscribe(
      response => {
        this.getUnidades(null, response.uf);
        this.spinner.hide();
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }
}
