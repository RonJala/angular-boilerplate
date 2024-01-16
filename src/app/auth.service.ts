import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from './models/LoginUser';
import { User } from './models/User';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  //listaUsuarios : User[] = [{"id":1,"name":"gary","last_name":"samchez","profile_picture":"https:\/\/picsum.photos\/500\/500","email":"ron","password":"ron","created_at":"2024-01-14T00:27:40.000000Z","updated_at":"2024-01-15T03:00:38.000000Z"},{"id":2,"name":"elba","last_name":"laso","profile_picture":"00","email":"00","password":"$2y$12$MDiUmh7y.bfIHYofN8V\/0.cV2K5uxYc7bwiXpmXXxVwSJr1gkkR3u","created_at":"2024-01-14T01:28:24.000000Z","updated_at":"2024-01-14T01:28:24.000000Z"},{"id":5,"name":"12345!q","last_name":"12345!q","profile_picture":"12345!q@outlook.com","email":"ronald_2341@outlook.com","password":"$2y$12$JElxmat9x\/doESwqZ43PrejCEzrnISVtcHSYUumVQPak3X9Ehv9Gi","created_at":"2024-01-14T05:19:31.000000Z","updated_at":"2024-01-14T05:19:31.000000Z"},{"id":6,"name":"Prueba para Jala","last_name":"Apellido Prueba","profile_picture":"https:\/\/images.indianexpress.com\/2023\/12\/ironman-05122023.jpg","email":"email@example.com","password":"contrase;a123","created_at":"2024-01-15T03:14:31.000000Z","updated_at":"2024-01-15T03:14:31.000000Z"}];


  login(body : LoginUser){
    let user : LoginUser = {
      email: body.email,
      password: body.password
    }
    let listaUsuarios : User[]  = localStorage.getItem('listaUsuarios') ? JSON.parse(localStorage.getItem('listaUsuarios') || '{}') : [];

    const userFound : User | undefined = listaUsuarios.find(
      (user) => user.email === body.email && user.password === body.password
    );

    if (userFound) {
      //console.log(userFound);
      return of(userFound);
    }


    return this.http.post('http://127.0.0.1:8000/api/login/', user);
  }
  register(body : User){
    let user : User = {
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
      profile_picture: body.profile_picture
    }
    let listaUsuarios : User[]  = localStorage.getItem('listaUsuarios') ? JSON.parse(localStorage.getItem('listaUsuarios') || '{}') : [];

    //get the last id from the list
    let lastId = listaUsuarios[listaUsuarios.length - 1].id;
    user.id = lastId! + 1;

    listaUsuarios.push(user);
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    return of(user);
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

    let listaUsuarios : User[]  = localStorage.getItem('listaUsuarios') ? JSON.parse(localStorage.getItem('listaUsuarios') || '{}') : [];

    let foundUser = listaUsuarios.find((user) => user.id == id);

    foundUser!.password = password;

    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

    return of(user);

    return this.http.put(`http://127.0.0.1:8000/api/users/${id}/passwordReset`, user);
  }

  updateUser(id : number, user : User){

    let listaUsuarios : User[]  = localStorage.getItem('listaUsuarios') ? JSON.parse(localStorage.getItem('listaUsuarios') || '{}') : [];

    let foundUser = listaUsuarios.find((user) => user.id == id);
    let foundUserIndex = listaUsuarios.findIndex((user) => user.id == id);

    foundUser!.name = user.name;
    foundUser!.last_name = user.last_name;
    foundUser!.profile_picture = user.profile_picture;

    listaUsuarios[foundUserIndex] = foundUser!;
    

    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

    //console.log(user);

    return of(user);

    return this.http.put(`http://127.0.0.1:8000/api/users/${id}`, user);
  }
}
