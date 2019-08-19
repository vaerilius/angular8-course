import {Injectable} from '@angular/core';
import {Post} from './post.model';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})

export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(post: Post) {
    const postData: Post = post;

    this.http.post<{ [key: string]: Post }>(
      'https://ng-complete-guide-b5dcc.firebaseio.com/posts.json',
      postData, {observe: 'response'}
    ).subscribe(data => {
      console.log(data);
    }, error1 => {
      this.error.next(error1.message);
    });

  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-b5dcc.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchParams,
        responseType: 'json'
      })
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (let responseDataKey in responseData) {
            if (responseData.hasOwnProperty(responseDataKey)) {
              postArray.push({...responseData[responseDataKey], id: responseDataKey})
            }
          }
          return postArray;
        }),
        catchError(err => {
          return throwError(err);
        }));
  }

  clearPosts() {
    return this.http.delete('https://ng-complete-guide-b5dcc.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }).pipe(tap(e => {
      if (e.type === HttpEventType.Sent) {
        //..
      }
      if (e.type === HttpEventType.Response) {
        console.log(e.body);
      }

    }));
  }
}
