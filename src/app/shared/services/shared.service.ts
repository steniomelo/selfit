import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private httpClient: HttpClient) {}

  getEstados(): Observable<any> {
    return this.httpClient
      .cache()
      .get(environment.API_REDBOX_PROD + '/estado/consultarestados')
      .pipe(
        map((body: any) => body.return),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  getCidadesPorEstado(codigoEstado: number): Observable<any> {
    return this.httpClient
      .cache()
      .get(environment.API_REDBOX_PROD + '/cidade/consultarporestado/' + codigoEstado)
      .pipe(
        map((body: any) => body.return),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  getUnidades(): Observable<any> {
    return this.httpClient
      .cache()
      .get(environment.API_SITE + '/unidade?longitude=0&latitude=0&page=1&perPage=10')
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  getCep(cep: number): Observable<any> {
    return this.httpClient.get(environment.API_REDBOX_PROD + '/consulta/' + cep + '/cep');
  }
}
