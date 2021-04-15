import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { user } from '../../models/user';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {

  user!: user;
  public name!: string;
  public email!: string;
  public password!: string;

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
    });
  }

  newNumber(quantity: number) : string
  {
    let part: string = '';
    for (let i = 0; i < quantity; i++) {
      part += Math.round((Math.random()*2)*(Math.random()*4));
    }
    return part;
  }

  addScore()
  {
    let data = this.user.scores!;
    data.push({
      "money" : 0,
      "number" : "9601-" + this.newNumber(4) + "-" + this.newNumber(4)
    });
    this.UserService.replacement(this.user.id, data, "score").subscribe((result : any) => {
      this.userinit(this.user.id);
    });
  }

}
