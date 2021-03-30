import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.user);
  }

}
