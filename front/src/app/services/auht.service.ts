import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuhtService
{

  private loginUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(data : string) : Observable<user[]>
  {
    return this.http.get<any>(this.loginUrl+'/login', {
      headers: new HttpHeaders({
        'Authorization': 'Basic '+ data
      })
    });
  }

  logout(data : string): any
  {
    localStorage.clear();
    return this.http.get<any>(this.loginUrl+'/logout', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ data
      })
    });
  }

  setUser(user : user) : boolean
  {
    let json = JSON.stringify(user.id +":"+ user.hash);
    return (localStorage.info = json) ? true: false;
  }

}
