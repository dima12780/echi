import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit
{

  money : number = 0;
  user!: user;

  constructor(
    private UserService: UserService
  ) { }

  ngOnInit(): void
  {
    let data = JSON.parse(localStorage.info).split(":");
    this.UserService.dowloadUser(data).subscribe((result : any) => {
      this.user = this.UserService.assembly(result[0]);
      let scores = this.user.scores;
      for (let score of scores!)
      {
        this.money += score.money;
      }
    });
  }

}
