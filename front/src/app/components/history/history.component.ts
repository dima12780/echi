import { Component, OnInit } from '@angular/core';
import { operation } from '../../models/operation';
import { user } from '../../models/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public operations: operation[] = [];
 
  constructor() { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.user);
    this.operations = user.history;

  }

  getHistory(type : boolean){
    let user = JSON.parse(localStorage.user);
    this.operations = [];
    for (let index = 0; index < user.history.length; index++) {
      if (user.history[index].balance === type) {
        this.operations.push(user.history[index]);
      }
    }
  }

}
