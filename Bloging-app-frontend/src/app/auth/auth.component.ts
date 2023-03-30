import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true

  constructor(private router:Router){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }  

  onSubmit(){
    this.router.navigate(['/']);
  }
}
