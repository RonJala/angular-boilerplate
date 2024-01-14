import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user : User  | null = null;

  constructor(private authService : AuthService){
    this.user = this.authService.getCurrentUser();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.authService.getCurrentUser();
    //refresh the page
    window.location.reload();
  }
}
