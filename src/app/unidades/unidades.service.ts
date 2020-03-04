import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {
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

  getUnidades(params?: HttpParams): Observable<any> {
    console.log(params);
    return this.httpClient.get(environment.API_SITE + '/unidade/', { params });
  }

  getUnidade(slug: string): Observable<any> {
    return this.httpClient.get(environment.API_SITE + '/unidade/' + slug + '/detalhes');
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getCep(cep: number): Observable<any> {
    return this.httpClient.get(environment.API_REDBOX_PROD + '/consulta/' + cep + '/cep');
  }
}
