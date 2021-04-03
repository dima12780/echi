import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Users } from '../../mocks/mock-users';
import { user } from '../../models/user';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit {

  @ViewChild('myInputOne') myInputOne!: ElementRef;
  @ViewChild('myInputTwo') myInputTwo!: ElementRef;
  @ViewChild('delFriend') delFriend!: ElementRef;

  Users = Users;

  public search: string = "";
  public user!: user;
  public selectedFriend!: user;
  public searchFriend: string = "";
  public allFriends: user[] = [];
  public searchFrends: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.user);
    this.selectedFriend = this.user;
    let MyFriends = this.user.friends;
    if (MyFriends) {
      for (let index = 0; index < MyFriends.length; index++) {
        this.allFriends.push(this.searchAllFrends(this.Users, MyFriends[index]));
        this.searchFrends.push(this.searchAllFrends(this.Users, MyFriends[index]));
      }
    }
  }

  cleaningInput(bool: boolean){
    bool ? this.myInputOne.nativeElement.value = "" : this.myInputTwo.nativeElement.value = "";
  }

  searchName(input: any[], search: string) {
    if (search === "") {
      this.searchFrends = this.allFriends;
    }else{
      search = search.toLowerCase();
      var output = [];
      for(var i=0; i<input.length; i++) {
        if(input[i].Name.toLowerCase().indexOf(search) !== -1 && input[i].id !== this.user.id) {
          output.push(input[i]);
        }
      }
      this.searchFrends = output;
    }
  }

  searchAllFrends(Users: any[], id: number) {
    for (let index = 0; index < Users.length; index++) {
      if (Users[index].id === id){
        return Users[index];
      } 
    }
  }

  onSelect(friend: user): void {
    this.selectedFriend = friend;
  }

}
