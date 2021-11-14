import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = `${environment.apiUrl}/user`;

  private headers(hash: string) {
    return new HttpHeaders({
      'authorization': 'Bearer '+ hash
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  searchUsersOfName(name : string, data: string) : Observable<user[]>
  {
    return this.http.get<any>(this.loginUrl, {
      headers: this.headers(data),
      params: new HttpParams()
            .set(`name`, name)});
  }

  createUser(body : any) : Observable<any[]>
  {
    return this.http.post<any>(this.loginUrl, body);
  }

  dowloadUser(data : string[]) : Observable<user[]>{
    return this.http.get<any>(this.loginUrl + "/" + data[0], {
      headers: this.headers(data[1])
    });
  }

  assembly(data : any) : user
  {
    let user$: user = new user(data);
    return user$;
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

  replacement(hash: string[], data : any, type: string)
  {
    let body: any;
    switch (type) {
      case "info":
        body = {
          "name" : data[0],
          "email" : data[1],
          "password" : data[2]
        }
        return this.http.put<any>(this.loginUrl+"/"+hash[0], body, {
          headers: this.headers(hash[1])
        });
        break;
      case "score":
        body = {
          "scores": data
        }
        return this.http.put<any>(this.loginUrl+"/"+hash[0], body, {
          headers: this.headers(hash[1])
        });
        break;
      default:
        return this.http.get<any>(this.loginUrl+"/"+hash[0], {
          headers: this.headers(hash[1])
        });
        break;
    }

  }

}
