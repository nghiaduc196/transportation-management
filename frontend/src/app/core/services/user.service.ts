import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  private SERVER_API_URL = environment.api;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<HttpResponse<User>> {
    return this.http.get<User>(this.SERVER_API_URL + 'users', {observe: 'response'});
  }

  filterUser(param?): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.SERVER_API_URL + 'users', {
      observe: 'response',
      params: param
    });
  }

  getAuthorities(param?): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.SERVER_API_URL + 'users/authorities', {
      observe: 'response',
      params: param
    });
  }

  getUserByLogin(login?): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.SERVER_API_URL + 'users/' + login, {
      observe: 'response',
    });
  }

  updateUser(user): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.SERVER_API_URL + 'users', user, {
      observe: 'response'
    });
  }


  create(user): Observable<any> {
    return this.http.post<any>(this.SERVER_API_URL + 'users', user, {
      observe: 'response'
    });
  }

  update(user): Observable<any> {
    return this.http.put<any>(this.SERVER_API_URL + 'users', user);
  }

  find(login: string): Observable<any> {
    return this.http.get<any>(`${this.SERVER_API_URL + 'users'}/${login}`);
  }
}
