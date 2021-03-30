import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  money : number = 0;
  user!: user;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.user);
    let array = this.user.scores;
    for (let index = 0; index < array.length; index++) {
      this.money += array[index].money;
    }
  }
}
