import { Injectable } from '@angular/core';
import {AccountService} from './account.service';
import {Router} from '@angular/router';
import {AuthServerProvider} from './auth-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider, private router: Router) { }

  login(credentials, callback?): any {
    // tslint:disable-next-line:only-arrow-functions
    const cb = callback || function(): any {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.accountService.identity(true).then(account => {
            resolve(data);
          });
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  logout(navigate?: any): any {
    if (this.accountService.isAuthenticated()) {
      this.authServerProvider.logout().subscribe((e) => {
        this.accountService.authenticate(null);
        if (navigate) {
          this.router.navigate(['']);
        }
      });
    } else {
      this.accountService.authenticate(null);
      if (navigate) {
        this.router.navigate(['']);
      }
    }
  }
}
