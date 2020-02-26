import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AreadoalunoService } from './areadoaluno.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-areadoaluno-meutreino',
  templateUrl: './areadoaluno.meutreino.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoMeutreinoComponent implements OnInit {
  isCollapsed: any;
  isCollapsed1: any;
  isCollapsed2: any;
  credentials: any;
  treinos: any;
  atividades: any = [];

  constructor(private credentialsService: CredentialsService, private areadoalunoService: AreadoalunoService) {}

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;

    this.getTreinos();
  }

  getTreinos() {
    this.areadoalunoService.getTreinos(this.credentials.codigo).subscribe(
      response => {
        this.treinos = response;

        this.getAtividades();
      },
      error => {
        console.log('ERRO', error);
      }
    );
  }

  getAtividades(fichaCliente?: number, treino?: any) {
    this.treinos.programa[0].programatreinoficha[0].forEach((item: any, index: number) => {
      this.areadoalunoService.getAtividades(item.codigo).subscribe(
        response => {
          this.treinos.programa[0].programatreinoficha[0][index].atividades = response;

          // this.atividades.push({
          //   ficha: fichaCliente,
          //   atividades: response
          // });
        },
        error => {
          console.log('ERRO', error);
        }
      );
    });
  }
}
