import { Component, OnInit } from '@angular/core';

import { AuhtService } from '../../services/auht.service';
import { user } from '../../models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user!: user;
  public name!: string;
  public email!: string;
  public password!: string;

  constructor(
    private auhtService: AuhtService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.user);
  }

  output(){
    this.auhtService.logout();
  }

}
