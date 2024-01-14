import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http : HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>("http://127.0.0.1:8000/api/posts/");
  }

  getPostsByUser(id : number){
    return this.http.get<Post[]>(`http://127.0.0.1:8000/api/posts/user/${id}`);
  }

  getPostsByID(id : number){
    return this.http.get<Post>(`http://127.0.0.1:8000/api/posts/${id}`);
  }

  updatePost(id : number, post : Post){
    return this.http.put(`http://127.0.0.1:8000/api/posts/${id}`, post);
  }

  createPost(body : Post){
    let post = {
      text: body.text,
      image_url: body.image_url,
      user_id: body.user_id
    }
    console.log(post)
    return this.http.post('http://127.0.0.1:8000/api/posts/', post);
  }

  deletePost(id : number){
    return this.http.delete(`http://127.0.0.1:8000/api/posts/${id}`);
  }

}
