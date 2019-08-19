import {Injectable} from '@angular/core';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})

export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(post: Post) {
    const postData: Post = post;

    this.http.post<{ [key: string]: Post }>(
      'https://ng-complete-guide-b5dcc.firebaseio.com/posts.json',
      postData).subscribe(data => {
      console.log(data);
    }, error1 => {
      this.error.next(error1.message);
    });

  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-b5dcc.firebaseio.com/posts.json')
      .pipe(map((responseData) => {
        const postArray: Post[] = [];
        for (let responseDataKey in responseData) {
          if (responseData.hasOwnProperty(responseDataKey)) {
            postArray.push({...responseData[responseDataKey], id: responseDataKey})
          }
        }
        return postArray;
      }));

  }

  clearPosts() {
    return this.http.delete('https://ng-complete-guide-b5dcc.firebaseio.com/posts.json');
  }
}
