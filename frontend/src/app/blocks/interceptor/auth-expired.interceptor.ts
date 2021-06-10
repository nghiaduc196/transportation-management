import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AccountService} from '../../core/services/account.service';
import {LoginService} from '../../core/services/login.service';


@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AccountService,
        private router: Router,
        private loginService: LoginService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            if (this.accountService.isAuthenticated()) {
                                this.accountService.authenticate(null);
                                this.router.navigate(['login']);
                            } else {
                                this.loginService.logout();
                                this.router.navigate(['/']);
                            }
                        }
                    }
                }
            )
        );
    }
}
