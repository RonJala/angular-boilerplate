import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  user : number | null | undefined;

  id : number | null | undefined;

  constructor(private authService : AuthService,private service : PostService, private activatedRoute : ActivatedRoute, private router : Router){

    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        if(this.id){
          this.fetchPost();
        }
      }
    );



    this.user = this.authService.getUserId();
    this.post.user_id = this.user!;
  }

  fetchPost(){
    this.service.getPostsByID(this.id!).subscribe(
      (data: any) => {
        //console.log('Obteniendo posts...');
        //console.log(data);
        this.post = data;
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }
  

  post : Post = {
    user_id: 0,
    text: '',
    image_url: ''
  }

  actualizarPost(){
    this.service.updatePost(this.id!, this.post).subscribe(
      res => {
        //console.log(res);
        this.router.navigate(['/home']);
      },
      err => {
        alert('Error al actualizar el post, intenta de nuevo');
        //console.log(err);
      }
    );
  }

  createPost(){
    let newPost : Post = {
      user_id: this.user!,
      text: this.post.text,
      image_url: this.post.image_url
    }
    this.service.createPost(newPost).subscribe(
      res => {
        //console.log(res);
      },
      err => {
        //console.log(err);
      }
    );
  }
}
