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

            if(err.status == 0){
              error = 'Sem comunicação com backend!';
            } else if (err.status == 500 && err.error.message.toString().search('Email ou senha está incorreto') != -1) {
              error = 'Email ou senha está incorreto!';
            } else if (err.status == 500 && err.error.message.toString().search('já está registrado') != -1) {
              error = 'Email já está registrado!';
            } else {
              const obj = err.error.error;
              const arr = Object.values(obj);
              let msgErro = '';

              for (let i = 0; i < arr.length; i++) {
                console.log(arr[i]);

                if(msgErro === ''){
                  msgErro = msgErro+Object.values(arr[i])[1]
                } else {
                  msgErro = msgErro+'\n'+Object.values(arr[i])[1]
                }

              }

              error = 'Erro: \n'+msgErro;
            }

            // console.error(error);
            // console.error(err);
            return throwError(error);
        }))
    }
}
