import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Account} from '../model/account.model';
import {environment} from '../../../environments/environment';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private SERVER_API_URL = environment.api;

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>(this.SERVER_API_URL + 'account', {observe: 'response'});
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(this.SERVER_API_URL + 'account', account, {observe: 'response'});
  }

  // Test facebook login
  fetchFB(): Observable<HttpResponse<User>> {
    return this.http.get<User>(this.SERVER_API_URL + 'account', {observe: 'response'});
  }

  saveFacebook(account: any): Observable<HttpResponse<any>> {
    return this.http.post(this.SERVER_API_URL + 'users-facebook', account, {observe: 'response'});
  }

  saveGoogle(account: any): Observable<HttpResponse<any>> {
    return this.http.post(this.SERVER_API_URL + 'users-google', account, {observe: 'response'});
  }

  authenticate(identity): void {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < authorities.length; i++) {
      if (this.userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }
    return false;
  }

  hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then(
      id => {
        return Promise.resolve(id.authorities && id.authorities.includes(authority));
      },
      () => {
        return Promise.resolve(false);
      }
    );
  }

  identity(force?: boolean): Promise<any> {
    if (force) {
      this.userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.fetch()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.userIdentity = account;
          this.authenticated = true;
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return this.userIdentity;
      })
      .catch(err => {
        this.userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return null;
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  switchMarketType(): Observable<any> {
    return this.http.put(this.SERVER_API_URL + 'switch-market', {observe: 'response'});
  }
  getImageUrl(): string {
    return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
  }
}
