import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public code: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getConfirm()
  {
    if(this.code.length === 5)
    {
      console.log(this.code);
      setTimeout(() => {this.router.navigate(['/auth'])}, 2000);
    }

  }

}
