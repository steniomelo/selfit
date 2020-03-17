import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

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

  getNoticias(): Observable<any> {
    return this.httpClient.get('http://selfit.inzn.com.br/wp-json/wp/v2/posts');
  }

  newsletter(dados: any): Observable<any> {
    return this.httpClient
      .cache()
      .post(environment.API_REDBOX_PROD + '/newsletter', dados)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(() => of('Não foi possível enviar sua mensagem'))
      );
  }
}
