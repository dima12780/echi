import { Injectable } from '@angular/core';

import { Users } from '../mocks/mock-users';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuhtService {

  Users = Users;
  
  constructor() { }

  login(name : string, pass : string) : boolean{
    for (let index = 0; index < Users.length; index++) {
      if (Users[index].Name === name) {
        if (Users[index].Password === pass) {
          this.setUser(Users[index]);
          return true;
        }
      }
    }return false;
  }

  logout(){
    localStorage.clear();
  }

  setUser(user : user)  {
    localStorage.user = JSON.stringify(user);
  }

}
