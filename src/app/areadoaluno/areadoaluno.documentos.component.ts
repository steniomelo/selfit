import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AreadoalunoService } from './areadoaluno.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-areadoaluno-documentos',
  templateUrl: './areadoaluno.documentos.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoDocumentosComponent implements OnInit {
  constructor(private areadoalunoService: AreadoalunoService) {}

  ngOnInit() {}

  gerarContrato() {
    console.log('oi');
    this.areadoalunoService
      .gerarContrato()
      .pipe(
        finalize(() => {
          //this.isLoading = false;
        })
      )
      .subscribe(
        response => {
          console.log(response);

          return (window.location.href = response.dados);
        },
        error => {
          console.log(error);
        }
      );
  }
}
