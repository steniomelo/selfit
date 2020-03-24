import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';

export interface LoginContext {
  email: string;
  senha: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  data: any;

  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    this.data = {
      email: context.email,
      senha: context.senha
    };

    return this.httpClient.post(environment.API_REDBOX_PROD + '/convidado/logarareaaluno', this.data).pipe(
      map((response: any) => {
        if (response) {
          this.credentialsService.setCredentials(response.return, context.remember);
          response = response.return;
          response.remember = context.remember;
          return response;
        }
      })
    );
  }

  esquecisenha(form: any): Observable<any> {
    return this.httpClient.post(environment.API_REDBOX_PROD + '/convidado/esqueceusenha', form).pipe(
      map((response: any) => {
        if (response) {
          response = response.return;
          return response;
        }
      })
    );
  }

  consultarContrato(contrato: number, remember: any): Observable<any> {
    // Replace by proper authentication call
    return this.httpClient
      .get(environment.API_REDBOX_PROD + '/convidado/contrato/consultarContratosCliente/' + contrato)
      .pipe(
        map((response: any) => {
          if (response) {
            this.credentialsService.setPlano(response.return, remember);
            return response.return;
          }
        })
      );
  }

  atualizarDados(cpf: string): Observable<any> {
    this.data = {
      email: cpf.split('.').join(''),
      senha: 'N/A',
      typeFind: 'Digital'
    };

    return this.httpClient.post(environment.API_REDBOX_PROD + '/convidado/logarareaaluno', this.data).pipe(
      map((response: any) => {
        if (response) {
          //console.log('Atualizar Dados >>>>', response);
          this.credentialsService.setCredentials(response.return, true);
          // response = response.return;
          // response.remember = context.remember;
          return response;
        }
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
