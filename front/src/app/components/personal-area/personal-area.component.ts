import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { user } from '../../models/user';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {

  public user!: user;
  public name!: string;
  public email!: string;
  public password!: string;

  constructor(
    private UserService: UserService
  ) { }

  ngOnInit(): void
  {
    let data = JSON.parse(localStorage.info).split(":");
    this.userinit(data);
  }

  userinit(data: string[]): void
  {
    this.UserService.dowloadUser(data).subscribe((result : any) => {
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
    let data = 
      [{
      "money" : 0,
      "number" : `96${this.user.id}-` + this.newNumber(4) + "-" + this.newNumber(2) + `${this.user.id}`
      }];
    this.UserService.replacement([``, this.user.hash], data, "score").subscribe((result : any) => {
      this.userinit([`${this.user.id}`, this.user.hash]);
    });
  }

}
