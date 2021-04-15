import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuhtService } from '../../services/auht.service';
import { user } from '../../models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @ViewChild('InputForm1') InputForm1!: ElementRef;
  @ViewChild('InputForm2') InputForm2!: ElementRef;
  @ViewChild('InputForm3') InputForm3!: ElementRef;
  @ViewChild('InputForm4') InputForm4!: ElementRef;

  public user!: user;
  public name!: string;
  public email!: string;
  public pass1!: string;
  public pass2!: string;
  public passError: string = "!Пароли не совпадают!";
  public password : boolean = false;

  constructor(
    private auhtService: AuhtService,
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

  replacementName(): void
  {
    this.password = false;
    let data = [
      this.name ?? this.user.Name,
      this.email ?? this.user.Email,
      (typeof(this.pass1) === 'string' && this.checkPass()) ? this.pass1 : this.user.Password,
    ];
    this.UserService.replacement(this.user.id, data, "info").subscribe((result : any) => {
      this.userinit(this.user.id);
    });
    this.cleaningInput();
  }

  checkPass() : boolean // если есть способ переработать логику этх проверок, нужно переделать
  {
    if ( this.pass1 === this.pass2 && this.pass1 !== "" && typeof(this.pass1) === 'string')
    {
      if (this.pass1.indexOf(" ") <= 0) {
        return true;
      }else{
        this.passError = "Пароль не должен содержать пробелов!";
        return false;
      }
    }else{
      this.password = true;
      return false;
    };
  }

  cleaningInput() : void{
    this.InputForm1.nativeElement.value = "";
    this.InputForm2.nativeElement.value = "";
    this.InputForm3.nativeElement.value = "";
    this.InputForm4.nativeElement.value = "";
  }

  output(): void
  {
    this.auhtService.logout();
  }

}
