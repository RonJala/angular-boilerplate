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
        //console.log(localStorage.getItem('currentUser'));
        setTimeout(() => {
          this.router.navigate(['/home']);
          
        }, 500);
      },
      err => {
        alert('Error al iniciar sesion, intenta de nuevo');
        //console.log(err);
      }
    );
  }

  resetData(){
    localStorage.setItem('listaUsuarios', JSON.stringify([{"id":1,"name":"gary","last_name":"samchez","profile_picture":"https:\/\/picsum.photos\/500\/500","email":"ron","password":"ron","created_at":"2024-01-14T00:27:40.000000Z","updated_at":"2024-01-15T03:00:38.000000Z"},{"id":2,"name":"elba","last_name":"laso","profile_picture":"00","email":"00","password":"$2y$12$MDiUmh7y.bfIHYofN8V\/0.cV2K5uxYc7bwiXpmXXxVwSJr1gkkR3u","created_at":"2024-01-14T01:28:24.000000Z","updated_at":"2024-01-14T01:28:24.000000Z"},{"id":5,"name":"12345!q","last_name":"12345!q","profile_picture":"12345!q@outlook.com","email":"ronald_2341@outlook.com","password":"$2y$12$JElxmat9x\/doESwqZ43PrejCEzrnISVtcHSYUumVQPak3X9Ehv9Gi","created_at":"2024-01-14T05:19:31.000000Z","updated_at":"2024-01-14T05:19:31.000000Z"},{"id":6,"name":"Prueba para Jala","last_name":"Apellido Prueba","profile_picture":"https:\/\/images.indianexpress.com\/2023\/12\/ironman-05122023.jpg","email":"email@example.com","password":"contrase;a123","created_at":"2024-01-15T03:14:31.000000Z","updated_at":"2024-01-15T03:14:31.000000Z"}]));
    localStorage.setItem('listaPosts', JSON.stringify([{"id":6,"user_id":2,"text":"Nada nuevo","image_url":"https:\/\/picsum.photos\/500\/500","created_at":"2024-01-14T02:10:01.000000Z","updated_at":"2024-01-14T02:10:01.000000Z"},{"id":8,"user_id":1,"text":"Holaxd123","image_url":"https:\/\/picsum.photos\/600\/500","created_at":"2024-01-14T04:36:53.000000Z","updated_at":"2024-01-15T02:00:11.000000Z"},{"id":9,"user_id":5,"text":"Primer post","image_url":"https:\/\/picsum.photos\/1024\/512","created_at":"2024-01-14T05:24:04.000000Z","updated_at":"2024-01-14T05:25:18.000000Z"},{"id":10,"user_id":1,"text":"Este es un post para la presentacion en Jala","image_url":"https:\/\/resizing.flixster.com\/-XZAfHZM39UwaGJIFWKAE8fS0ak=\/v3\/t\/assets\/p170620_p_v8_az.jpg","created_at":"2024-01-15T03:09:28.000000Z","updated_at":"2024-01-15T03:09:28.000000Z"},{"id":11,"user_id":1,"text":"Jarvis, dame 3 de asada","image_url":"https:\/\/images.indianexpress.com\/2023\/12\/ironman-05122023.jpg","created_at":"2024-01-15T03:10:43.000000Z","updated_at":"2024-01-15T03:10:43.000000Z"},{"id":12,"user_id":1,"text":"Fondo de pantalla","image_url":"https:\/\/i0.wp.com\/imgs.hipertextual.com\/wp-content\/uploads\/2014\/03\/windows_xp_bliss-wide.jpg?fit=1200%2C750&quality=50&strip=all&ssl=1","created_at":"2024-01-15T03:12:02.000000Z","updated_at":"2024-01-15T03:12:02.000000Z"},{"id":13,"user_id":6,"text":"email@example.com contrase;a123","image_url":"https:\/\/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com\/i\/f8f4451d-4da4-43b1-b53c-9c9baa073b5c\/dcuhnuk-ea41281e-67f4-4bc5-90d1-64db0acc66d3.jpg","created_at":"2024-01-15T03:16:48.000000Z","updated_at":"2024-01-15T03:16:48.000000Z"},{"id":14,"user_id":6,"text":"Kung fu panda es una buena pelicula","image_url":"https:\/\/www.universalpictures.com.mx\/tl_files\/content\/movies\/kung_fu_panda_4\/kung-fu-panda-4_header-mobile.jpg","created_at":"2024-01-15T03:17:17.000000Z","updated_at":"2024-01-15T03:17:52.000000Z"}]));

  }
}