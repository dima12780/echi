import { Component, OnInit } from '@angular/core';
import { Users } from '../../mocks/mock-users';
import { user } from '../../models/user';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  Users = Users;
  public search: any;
  public friend: any;
  public friends: user[] = [];

  constructor() { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.user);
    let MyFriends = user.friends;
    if (MyFriends) {
      for (let index = 0; index < MyFriends.length; index++) {
        this.friends.push(this.searchFrends(this.Users, MyFriends[index]));
      }
    }
  }

  searchFrends(Users: any[], id: number) {
    for (let index = 0; index < Users.length; index++) {
      if (Users[index].id === id){
        return Users[index];
      } 
    }
  }

}
