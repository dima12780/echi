import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
// import { user } from '../../models/user';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.css']
})
export class RegistrComponent implements OnInit {

  public consent: boolean = false;
  public name: string = '';
  public email: string = '';
  public pass: string = '';
  public errno?: string;


  constructor(
    private UserService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createUser()
  {
    if (this.name && this.email && this.pass)
    {
      let body = [{
        "name" : this.name,
        "email" : this.email,
        "password" :  this.pass
      }];
      this.UserService.createUser(body).subscribe((result : any) => {
        this.router.navigate(['/auth']);
      });
    }else{
      this.errno = "Заполните: ";
      if(!this.name) {
        this.errno += "Имя ";
      }
      if(!this.email) {
        this.errno += "Почту ";
      }
      if(!this.pass) {
        this.errno += "Пароль"
        ;}
    }
  }

}
