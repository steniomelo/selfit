import { Component, OnInit } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomeService } from './home.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;

  quote: string | undefined;
  noticias: any;
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

  constructor(private homeService: HomeService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.isLoading = true;
    this.createForm();

    //this.getNoticias();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  enviar() {
    const form$ = this.homeService.newsletter(this.form.value);
    form$
      .pipe(
        catchError((error): any => {
          Swal.fire('Erro', error, 'error');
        })
      )
      .subscribe(
        response => {
          console.log(response);
          if (response.return) {
            Swal.fire('E-mail cadastrado com sucesso', ' ', 'success');
          } else {
            Swal.fire('Erro', response.error, 'error');
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getNoticias() {
    this.homeService.getNoticias().subscribe(
      response => {
        console.log(response);
        this.noticias = response;
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }
}
