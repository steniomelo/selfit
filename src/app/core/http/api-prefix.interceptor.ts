import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        chave: environment.chave,
        retornar: 'true'
      })
    };
    request = request.clone({
      headers: httpOptions.headers
    });

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        // url: environment.serverUrl + request.url,
        url: request.url
      });
    }
    return next.handle(request);
  }
}
