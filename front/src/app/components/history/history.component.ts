import { Component, OnInit } from '@angular/core';
import { operation } from '../../models/operation';
import { UserService } from '../../services/user.service';
import { user } from '../../models/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public operations: operation[] = [];
  public user!: user;
 
  constructor(
    private UserService: UserService
  ) { }

  ngOnInit(): void
  {
    let userId = JSON.parse(localStorage.userId);
    this.userinit(userId);
  }

  userinit(userId: number): void
  {
    this.UserService.searchUser(userId).subscribe((result : any) => {
      this.user = this.UserService.assembly(result[0]);
      this.operations = this.user.history!;
    });
  }

  getHistory(type : boolean){
    let history = this.user.history!;
    this.operations = [];
    for (let index = 0; index < history.length; index++) {
      if (history[index].balance === type) {
        this.operations.push(history[index]);
      }
    }
  }

}
