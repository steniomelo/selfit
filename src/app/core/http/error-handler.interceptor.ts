import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';

const log = new Logger('ErrorHandlerInterceptor');

import Swal from 'sweetalert2';

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }

    if (response.error) {
      if (response.error.msgValidacao) {
        Swal.fire('Erro', response.error.msgValidacao, 'error');
      } else {
        Swal.fire('Erro', response.error.error, 'error');
      }
    } else {
      Swal.fire('Erro', 'Houve um erro inesperado!', 'error');
    }

    throw response;
  }
}
