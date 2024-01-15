import { Component } from '@angular/core';
import { Post } from '../models/Post';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  posts: Post[] = [];

  post: Post = {
    user_id: 0,
    text: '',
    image_url: '',
  };

  constructor(private service: PostService, private authService : AuthService, private router : Router) {
    this.fetchPosts();
    this.user = this.authService.getUserId();
    
    if(!this.user){
     this.router.navigate(['/login']);
    }
    this.post.user_id = this.user!;
  }

  user : number| null | undefined;

  fetchPosts(){
    this.service.getPosts().subscribe(
      (data: Post[]) => {
        //console.log('Obteniendo posts...');
        //console.log(data);
        this.posts = data;
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
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
        this.fetchPosts();
      },
      err => {
        //console.log(err);
      }
    );
    this.post.text = '';
    this.post.image_url = '';
  }

  deletePost(id : number | undefined){
    this.service.deletePost(id!).subscribe(
      res => {
        //console.log(res);
        this.fetchPosts();
        if(res == 204){
          this.fetchPosts();
        }
      },
      err => {
        //console.log(err);
      }
    );
  }
}
