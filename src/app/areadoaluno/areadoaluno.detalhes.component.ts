import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AreadoalunoService } from './areadoaluno.service';
import { finalize } from 'rxjs/operators';
import { CredentialsService } from '@app/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-areadoaluno-detalhes',
  templateUrl: './areadoaluno.detalhes.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoDetalhesComponent implements OnInit {
  credentials: any;

  constructor(
    private areadoalunoService: AreadoalunoService,
    private credentialsService: CredentialsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  getPlanoDetalhes() {
    this.spinner.show();
    this.credentials = this.credentialsService.credentials;

    this.areadoalunoService
      .gerarContrato(this.credentials.codigocontrato)
      .pipe(
        finalize(() => {
          //this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          console.log(response);
          //this.spinner.hide();

          return (window.location.href = response.dados);
        },
        error => {
          console.log(error);
        }
      );
  }
}
