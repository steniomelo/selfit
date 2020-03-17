import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class FaleconoscoService {
  constructor(private httpClient: HttpClient) {}

  criarTicket(dados: any): Observable<any> {
    return this.httpClient
      .cache()
      .post(environment.API_REDBOX_PROD + '/contato/faleConosco', dados)
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Não foi possível enviar sua mensagem'))
      );
  }

  divulgueSuamarca(dados: any): Observable<any> {
    return this.httpClient
      .cache()
      .post(environment.API_REDBOX_PROD + '/contato/divulgueSuaMarca', dados)
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Não foi possível enviar sua mensagem'))
      );
  }

  franqueados(dados: any): Observable<any> {
    return this.httpClient
      .cache()
      .post(environment.API_REDBOX_PROD + '/contato/franquia', dados)
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Não foi possível enviar sua mensagem'))
      );
  }
}
