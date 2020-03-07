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

  criarTicket(): Observable<any> {
    return this.httpClient
      .cache()
      .get(environment.API_REDBOX_PROD + '/trilogo/criarticket')
      .pipe(
        map((response: any) => response.return),
        catchError(() => of('Não foi possível obter os estados'))
      );
  }
}
