import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { UserService } from '../../services/user.service';
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

  public search: string = "";
  public user!: user;
  public selectedFriend!: user;
  public searchFriend: string = "";
  public allFriends: user[] = [];
  public searchFrends: any[] = [];

  constructor(
    private UserService: UserService
  ) { }

  ngOnInit(): void
  {
    let userId = JSON.parse(localStorage.userId);
    this.UserService.searchUser(userId).subscribe((result : any) => {
      this.user = this.UserService.assembly(result[0]);
      let MyFriends = this.user.friends;
      for (let score of MyFriends!)
      {
        this.searchAllFrends(score);
      }
    });
  }

  searchAllFrends(id: number) {
    this.UserService.searchUser(id).subscribe((result : any) => {
       let user = this.UserService.assembly(result[0]);
      this.allFriends.push(user);
      this.searchFrends.push(user);
    })
  }

  cleaningInput(bool: boolean){
    bool ? this.myInputOne.nativeElement.value = "" : this.myInputTwo.nativeElement.value = "";
  }

  searchName(input: boolean, search: string) 
  {
    if (search === "") {
      this.searchFrends = this.allFriends;
    }else{
      if (input){
        let users:any = [];
        this.UserService.searchUsersOfName(search).subscribe((result : any) => {
          for (let i = 0; i < result.length; i++)
          {
            users.push(this.UserService.assembly(result[i]));
          }
          this.searchFrends = users;
        })
      }else{
        search = search.toLowerCase();
        let output = [];
        for(let i=0; i<this.allFriends.length; i++){
          if(this.allFriends[i].Name.toLowerCase().indexOf(search) !== -1 && this.allFriends[i].id !== this.user.id){
            output.push(this.allFriends[i]);
          }
        }
        this.searchFrends = output;
      }
    }
  }

  onSelect(friend: user): void
  {
    this.selectedFriend = friend;
  }

}
