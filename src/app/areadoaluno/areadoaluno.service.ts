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
  constructor(private httpClient: HttpClient) {}

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

  editarPerfil(dados: any): Observable<any> {
    return this.httpClient
      .put(environment.API_REDBOX_PROD + '/atualizar/perfil', dados)
      .pipe(map((response: any) => response));
  }

  gerarContrato(codigoContrato: number): Observable<any> {
    return this.httpClient.cache().post(environment.API_REDBOX_PROD + '/prest/negociacao/gerarContratoHtml', {
      codigoContrato: codigoContrato
    });
  }

  transferirAluno(dados: any): Observable<any> {
    return this.httpClient.post(environment.API_REDBOX_PROD + '/contrato/transferirConvidado', dados);
  }

  getTreinos(codigoCliente: number): Observable<any> {
    return this.httpClient
      .get(environment.API_REDBOX_PROD + '/turmas/consultarPrograma?codigocliente=' + codigoCliente)
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Nenhum treino encontrado'))
      );
  }

  getAtividades(fichaCliente: number): Observable<any> {
    return this.httpClient
      .get(environment.API_REDBOX_PROD + '/turmas/consultarAtividades?fichacliente=' + fichaCliente)
      .pipe(
        map((response: any) => response.return.atividades),
        catchError(() => of('Nenhuma atividade encontrada'))
      );
  }

  consultarValorCancelamento(codigoContrato: number): Observable<any> {
    return this.httpClient
      .post(environment.API_REDBOX_PROD + '/prest/negociacao/producao/consultarValorCancelamentoContrato', {
        codigoContrato: codigoContrato
      })
      .pipe(map((response: any) => response.dados));
  }

  cancelarContrato(codigoContrato: number): Observable<any> {
    return this.httpClient
      .post(environment.API_REDBOX_PROD + '/prest/negociacao/producao/cancelarContratoComPagamentoOnline', {
        codigoContrato: codigoContrato
      })
      .pipe(map((response: any) => response));
  }

  getParcelas(codigoContrato: number): Observable<any> {
    return this.httpClient
      .get(environment.API_REDBOX_PROD + '/convidado/contrato/' + codigoContrato + '/parcela')
      .pipe(map((response: any) => response.return));
  }

  alterarCartao(dados: any): Observable<any> {
    return this.httpClient
      .post(environment.API_REDBOX_PROD + '/contrato/alterarCartaoDeCredito', dados)
      .pipe(map((response: any) => response));
  }
}
