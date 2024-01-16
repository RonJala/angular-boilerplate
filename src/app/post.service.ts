import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './models/Post';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  // listaPosts : Post[] = [{"id":6,"user_id":2,"text":"Nada nuevo","image_url":"https:\/\/picsum.photos\/500\/500","created_at":"2024-01-14T02:10:01.000000Z","updated_at":"2024-01-14T02:10:01.000000Z"},{"id":8,"user_id":1,"text":"Holaxd123","image_url":"https:\/\/picsum.photos\/600\/500","created_at":"2024-01-14T04:36:53.000000Z","updated_at":"2024-01-15T02:00:11.000000Z"},{"id":9,"user_id":5,"text":"Primer post","image_url":"https:\/\/picsum.photos\/1024\/512","created_at":"2024-01-14T05:24:04.000000Z","updated_at":"2024-01-14T05:25:18.000000Z"},{"id":10,"user_id":1,"text":"Este es un post para la presentacion en Jala","image_url":"https:\/\/resizing.flixster.com\/-XZAfHZM39UwaGJIFWKAE8fS0ak=\/v3\/t\/assets\/p170620_p_v8_az.jpg","created_at":"2024-01-15T03:09:28.000000Z","updated_at":"2024-01-15T03:09:28.000000Z"},{"id":11,"user_id":1,"text":"Jarvis, dame 3 de asada","image_url":"https:\/\/images.indianexpress.com\/2023\/12\/ironman-05122023.jpg","created_at":"2024-01-15T03:10:43.000000Z","updated_at":"2024-01-15T03:10:43.000000Z"},{"id":12,"user_id":1,"text":"Fondo de pantalla","image_url":"https:\/\/i0.wp.com\/imgs.hipertextual.com\/wp-content\/uploads\/2014\/03\/windows_xp_bliss-wide.jpg?fit=1200%2C750&quality=50&strip=all&ssl=1","created_at":"2024-01-15T03:12:02.000000Z","updated_at":"2024-01-15T03:12:02.000000Z"},{"id":13,"user_id":6,"text":"email@example.com contrase;a123","image_url":"https:\/\/images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com\/i\/f8f4451d-4da4-43b1-b53c-9c9baa073b5c\/dcuhnuk-ea41281e-67f4-4bc5-90d1-64db0acc66d3.jpg","created_at":"2024-01-15T03:16:48.000000Z","updated_at":"2024-01-15T03:16:48.000000Z"},{"id":14,"user_id":6,"text":"Kung fu panda es una buena pelicula","image_url":"https:\/\/www.universalpictures.com.mx\/tl_files\/content\/movies\/kung_fu_panda_4\/kung-fu-panda-4_header-mobile.jpg","created_at":"2024-01-15T03:17:17.000000Z","updated_at":"2024-01-15T03:17:52.000000Z"}];

  getPosts() {
    let listaPosts = localStorage.getItem('listaPosts')
      ? JSON.parse(localStorage.getItem('listaPosts') || '{}')
      : [];
    return of(listaPosts);

    return this.http.get<Post[]>('http://127.0.0.1:8000/api/posts/');
  }

  getPostsByUser(id: number) {
    let listaPosts: Post[] = localStorage.getItem('listaPosts')
      ? JSON.parse(localStorage.getItem('listaPosts') || '{}')
      : [];

    return of(listaPosts.filter((post) => post.user_id === id));

    return this.http.get<Post[]>(`http://127.0.0.1:8000/api/posts/user/${id}`);
  }

  getPostsByID(id: number) {
    let listaPosts: Post[] = localStorage.getItem('listaPosts')
      ? JSON.parse(localStorage.getItem('listaPosts') || '{}')
      : [];

    //console.log('Buscando posts con el id:', id);
    let post = listaPosts.find((post) => post.id == id);
    //console.log(post);

    return of(listaPosts.find((post) => post.id == id));

    return this.http.get<Post>(`http://127.0.0.1:8000/api/posts/${id}`);
  }

  updatePost(id: number, post: Post) {
    let postUpdated = {
      text: post.text,
      image_url: post.image_url,
    };
    let listaPosts: Post[] = localStorage.getItem('listaPosts')
      ? JSON.parse(localStorage.getItem('listaPosts') || '{}')
      : [];

    let index = listaPosts.findIndex((post) => post.id == id);

    listaPosts[index].text = post.text;
    listaPosts[index].image_url = post.image_url;

    localStorage.setItem('listaPosts', JSON.stringify(listaPosts));

    return of(listaPosts[id]);

    return this.http.put(`http://127.0.0.1:8000/api/posts/${id}`, post);
  }

  createPost(body: Post) {


    let post : Post = {
      text: body.text,
      image_url: body.image_url,
      user_id: body.user_id,
    };

    let listaPosts: Post[] = localStorage.getItem('listaPosts')
      ? JSON.parse(localStorage.getItem('listaPosts') || '{}')
      : [];

    //get the last id from the list
    let lastId = listaPosts[listaPosts.length - 1].id;
    post.id = lastId! + 1;

    listaPosts.push(post);

    localStorage.setItem('listaPosts', JSON.stringify(listaPosts));

    return of(post);

    return this.http.post('http://127.0.0.1:8000/api/posts/', post);
  }

  deletePost(id: number) {

    let listaPosts: Post[] = localStorage.getItem('listaPosts')
      ? JSON.parse(localStorage.getItem('listaPosts') || '{}')
      : [];

    

    listaPosts =listaPosts.filter((post) => post.id !== id);

    localStorage.setItem('listaPosts', JSON.stringify(listaPosts));

    return of(listaPosts);

    return this.http.delete(`http://127.0.0.1:8000/api/posts/${id}`);
  }
}
