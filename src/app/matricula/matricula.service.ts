import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  constructor(private httpClient: HttpClient) {}

  novoContrato(dados: any): Observable<any> {
    return this.httpClient
      .post(environment.API_REDBOX_PROD + '/contrato/novoContrato', dados)
      .pipe(map((body: any) => body));
  }

  gerarBoleto(dados: any, hash: any): Observable<any> {
    return this.httpClient
      .post(environment.API_REDBOX_PROD + '/prest/negociacao/' + hash + '/gerarBoletoContratoPorCliente', dados)
      .pipe(map((body: any) => body));
  }
}
