import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServerProvider {
  private  SERVER_API_URL = environment.api;
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) { }

  getToken(): any {
      return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
  }

  login(credentials): Observable<any> {
    const url = this.SERVER_API_URL + 'authenticate';
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: true
    };
    return this.http.post(url, data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp): any {
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt, true);
        return jwt;
      }
    }
  }


  // Test login with facebook
  loginFB(credentials): Observable<any> {
    const url = this.SERVER_API_URL + 'authenticate-facebook';
    const data = {
      accessToken: credentials.accessToken,
      username: credentials.username,
      password: credentials.password,
      rememberMe: true
    };
    // eslint-disable-next-line
    console.log(credentials.accessToken);
    return this.http.post(url, data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp): any {
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt, true);
        return jwt;
      }
    }
  }

  loginGoogle(credentials): Observable<any>{
    const url = this.SERVER_API_URL + 'authenticate-google';
    const data = {
      accessToken: credentials.accessToken,
      username: credentials.username,
      password: credentials.password,
      rememberMe: true,
      email: credentials.email
    };
    // eslint-disable-next-line
    console.log(credentials.accessToken);
    return this.http.post(url, data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp): any {
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt,true);
        return jwt;
      }
    }
  }

  loginWithToken(jwt, rememberMe): any {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  storeAuthenticationToken(jwt, rememberMe): any {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.next(true);
      observer.complete();
    });
  }
}
