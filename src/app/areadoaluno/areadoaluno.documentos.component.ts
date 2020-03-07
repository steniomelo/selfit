import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AreadoalunoService } from './areadoaluno.service';
import { finalize } from 'rxjs/operators';
import { CredentialsService } from '@app/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-areadoaluno-documentos',
  templateUrl: './areadoaluno.documentos.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoDocumentosComponent implements OnInit {
  credentials: any;

  constructor(
    private areadoalunoService: AreadoalunoService,
    private credentialsService: CredentialsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  gerarContrato() {
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

          //return (window.location.href = response.dados);
          window.open(
            response.dados,
            '_blank' // <- This is what makes it open in a new window.
          );
          this.spinner.hide();
        },
        error => {
          console.log(error);
        }
      );
  }
}
