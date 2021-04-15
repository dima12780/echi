import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$! : user;
  private loginUrl = `${environment.apiUrl}/user`;

  constructor(
    private http: HttpClient
  ) { }

  searchUsersOfName(name : string) : Observable<user[]>
  {
    return this.http.get<any>(this.loginUrl, {
      params: new HttpParams()
            .set(`name`, name)});
  }

  searchUser(id : number) : Observable<user[]>
  {
    return this.http.get<any>(this.loginUrl + "/" + id);
  }

  assembly(data : any) : user
  {
    this.user$ = new user(
      data.id,
      data.name,
      data.email,
      data.password,
      this.substitution(data.scores),
      this.substitution(data.friends),
      this.substitution(data.history)
    );
    return this.user$;
  }

  substitution (data : any) : any[]
  {
    if (data) {
      let result = [];
      let array = Object.keys(data).length;
      for (let index = 0; index < array; index++)
      {
        result.push(data[index]);
      }
      return result;
    }
    return [];
  }

  replacement(id: number, data : any, that: string)
  {
    switch (that) {
      case "info":
        return this.http.put<any>(this.loginUrl+"/"+id, {
          "name" : data[0],
          "email" : data[1],
          "password" : data[2]
        });
      case "score":
        return this.http.put<any>(this.loginUrl+"/"+id, {
          "scores": data
        });
      default:
        return this.http.get<any>(this.loginUrl+"/"+id)
    }
  }

}
