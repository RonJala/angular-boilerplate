import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errors: string[] = [];

  constructor(private service : AuthService, private router : Router) { }
  user: User = {
    name: '',
    last_name: '',
    email: '',
    password: '',
    profile_picture: ''
  };
  
  register(){
    
    this.errors = []; 
  
    if (this.user.name.length < 5 || this.user.name.length > 50) {
      this.errors.push('El nombre debe tener entre 5 y 50 caracteres');
    }
    
    if (this.user.last_name.length < 5 || this.user.last_name.length > 50) {
      this.errors.push('El apellido debe tener entre 5 y 50 caracteres');
    }
    
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.user.email)) {
      this.errors.push('El email no es válido');
    }
    
    if (this.user.password.length < 5 || !/[A-Za-z]/.test(this.user.password) || !/\d/.test(this.user.password)) {
      this.errors.push('La contraseña debe tener al menos 5 caracteres y contener letras y números');
    }
  
    //get data from repeatedPassword
    let repeatedPassword = (<HTMLInputElement>document.getElementById('repeatedPassword')).value;
    if(this.user.password != repeatedPassword){
      alert(repeatedPassword)
      this.errors.push('Las contraseñas no coinciden');
    }
  
    if(this.errors.length > 0){
      return;
    }
    
  
    //console.log(this.user);
    this.service.register(this.user).subscribe(
      res => {
        //console.log(res);
        this.router.navigate(['/login']);
         },
      err => {
        //console.log(err);
      }
    );
  
  }
  
}
