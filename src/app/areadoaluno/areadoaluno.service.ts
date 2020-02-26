import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CredentialsService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class AreadoalunoService {
  credentials = this.credentialsService.credentials;

  constructor(private httpClient: HttpClient, private credentialsService: CredentialsService) {}

  getEstados(): Observable<any> {
    return this.httpClient
      .cache()
      .get(environment.API_REDBOX_PROD + '/estado/consultarestados')
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Não foi possível obter os estados'))
      );
  }

  getCidadesPorEstado(codigoEstado: number): Observable<any> {
    return this.httpClient
      .cache()
      .get(environment.API_REDBOX_PROD + '/cidade/consultarporestado/' + codigoEstado)
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Nenhuma cidade encontrada'))
      );
  }

  gerarContrato(): Observable<any> {
    return this.httpClient.cache().post(environment.API_REDBOX_PROD + '/prest/negociacao/gerarContratoHtml', {
      codigoContrato: this.credentials.codigocontrato
    });
  }

  transferirAluno(dados: any) {
    return this.httpClient.post(environment.API_REDBOX_PROD + '/contrato/transferirConvidado', dados);
  }

  getTreinos(codigoCliente: number) {
    return this.httpClient
      .get(environment.API_REDBOX_PROD + '/turmas/consultarPrograma?codigocliente=' + codigoCliente)
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Nenhum treino encontrado'))
      );
  }

  getAtividades(fichaCliente: number) {
    return this.httpClient
      .get(environment.API_REDBOX_PROD + '/turmas/consultarAtividades?fichacliente=' + fichaCliente)
      .pipe(
        map((response: any) => response.return.atividades),
        catchError(() => of('Nenhuma atividade encontrada'))
      );
  }
}
