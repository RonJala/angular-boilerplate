import { Component } from '@angular/core';
import { LoginUser } from '../models/LoginUser';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginUser : LoginUser = {
    email: '',
    password: ''
  };

  constructor(private service : AuthService, private router : Router) { }

  login(){
    this.service.login(this.loginUser).subscribe(
      res => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        console.log(localStorage.getItem('currentUser'));
        setTimeout(() => {
          this.router.navigate(['/home']);
          
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }
}