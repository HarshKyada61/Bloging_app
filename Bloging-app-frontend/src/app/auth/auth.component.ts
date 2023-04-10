import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-handler.service';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  @ViewChild('form') authForm: NgForm;
  isLoginMode = true;
  token=null;
  // user = {
  //   name: "",
  //   email: "",
  //   password: "",
  // }

  constructor(private router: Router, public dataHandler: DataStorageService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    event?.preventDefault()
    const user = this.authForm.form.value;
    if (this.isLoginMode) {
      this.dataHandler.login(user).subscribe(
        (res: any) => {
          this.dataHandler.loggedinUser = res.user._id
          this.token = res.token;
          console.log('login Successfully');
          if (this.token) {
            this.storeToken()
          }
        },
        (err) => {
          alert("can't login");
        },
      );
    } else {
      this.dataHandler.signup(user).subscribe(
        (res: any) => {
          this.dataHandler.loggedinUser = res.user._id
          this.token = res.token;
          console.log('signup successfully');
          if (this.token) {
           this.storeToken()
          }
        },
        (err) => {
          alert("Can't Signup");
        },
      );
    }
  }

  storeToken(){
    this.router.navigate(['/'])
    this.dataHandler.setToken(this.token)
  }
}
