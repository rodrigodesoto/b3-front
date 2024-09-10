import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { EmailValidator } from '@angular/forms';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.accountService.accountValue) {
        // auto logout if 401 or 403 response returned from api
        this.accountService.logout();
      }

      let error = (err && err.error && err.error.message) || err.statusText;

      if (err.status == 0) {
        error = 'Sem comunicação com backend!';
      } else if (err.status == 400) {

        const obj = err.error;

        for (const chave in obj) {
          if (obj.hasOwnProperty(chave)) {
            const objErr = obj[chave];

            if(objErr.toString().substring(0,95).search('duplicate key error') != -1) {
              error = error + '\n' +objErr.toString().substring(0,95);
            }
          }
        }

      } else if (err.status == 401) {
        error = err.statusText;
      } else if (err.status == 500 && err.error.message.toString().search('Email ou senha está incorreto') != -1) {
        error = 'Email ou senha está incorreto!';
      } else if (err.status == 500 && err.error.message.toString().search('já está registrado') != -1) {
        error = 'Email já está registrado!';
      } else if (err.status == 500 && err.error.message.toString().search('Invalid login') != -1
        && err.error.message.toString().search('support@') != -1) {
        error = 'Não foi possível enviar email!';
      } else {
        let msgErro = error;
        error = 'Erro: \n' + msgErro;
      }
      return throwError(error);
    }))
  }
}
