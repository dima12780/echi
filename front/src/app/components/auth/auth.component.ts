import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuhtService } from '../../services/auht.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
}) 

export class AuthComponent implements OnInit {

  public name!: string;
  public password!: string;
  public errno!: string;
  public hasLogin : boolean = false;

  constructor(
    private router: Router,
    private auhtService: AuhtService
    ) { }

  ngOnInit(): void {
  }

  Auth(name: string, password: string)
  {
    this.auhtService.login(name, password).subscribe(result => {
      if (result.length !== 0) {
        this.auhtService.setUser(result[0].id);
        this.router.navigate(['/main']);
      }else this.errno = "Неверные Имя Пользователя или Пароль";
    })
  }

}
