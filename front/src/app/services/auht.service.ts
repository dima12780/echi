import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  login(name : string, pass : string) : Observable<user[]>
  {
    return this.http.get<any>(this.loginUrl, {
      params: new HttpParams()
            .set(`name`, name)
            .set(`pass`, pass)
    });
  }

  logout() : void
  {
    localStorage.clear();
  }

  setUser(userId : number) : boolean
  {
    return (localStorage.userId = JSON.stringify(userId)) ? true: false;
  }

}
