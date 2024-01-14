import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from './models/LoginUser';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(body : LoginUser){
    let user : LoginUser = {
      email: body.email,
      password: body.password
    }
    return this.http.post('http://127.0.0.1:8000/api/login/', user);
  }
  register(body : User){
    let user = {
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
      profile_picture: body.profile_picture
    }
    return this.http.post('http://127.0.0.1:8000/api/register/', user);
  }
  logout(){
  }

  getUserId() {
    if (typeof localStorage !== 'undefined') {
      let user: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
      return user?.id;
    } else {
      // Manejar el caso en el que localStorage no está disponible
      return null;
    }
  }
  
  getCurrentUser() {
    if (typeof localStorage !== 'undefined') {
      let user: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
      return user;
    } else {
      // Manejar el caso en el que localStorage no está disponible
      return null;
    }
  }

  updatePassword(id :  number, password : string){
    let user = {
      password: password
    }
    return this.http.put(`http://127.0.0.1:8000/api/users/${id}/passwordReset`, user);

  }
}
