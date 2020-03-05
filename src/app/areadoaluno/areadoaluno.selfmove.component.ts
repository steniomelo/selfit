import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AreadoalunoService } from './areadoaluno.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-areadoaluno-selfmove',
  templateUrl: './areadoaluno.selfmove.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoSelfmoveComponent implements OnInit {
  isCollapsed: any;
  isCollapsed1: any;
  isCollapsed2: any;
  credentials: any;
  treinos: any;
  atividades: any = [];

  constructor(
    private credentialsService: CredentialsService,
    private areadoalunoService: AreadoalunoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;

    this.getTreinos();
  }

  getTreinos() {
    this.spinner.show();
    this.areadoalunoService.getTurmasAmbientes().subscribe(
      response => {
        this.treinos = response;
        if (this.treinos && this.treinos.grade > 0) {
        } else {
          this.spinner.hide();
        }
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }
}
