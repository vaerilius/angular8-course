import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post< {[key: string]: Post}>(
      'https://ng-complete-guide-b5dcc.firebaseio.com/posts.json',
      postData).subscribe(data => {
      console.log(data);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get< {[key: string]: Post}>('https://ng-complete-guide-b5dcc.firebaseio.com/posts.json')
          .pipe(map((responseData) => {
            const postArray: Post[] = [];
            for (let responseDataKey in responseData) {
              if (responseData.hasOwnProperty(responseDataKey)) {
                postArray.push({...responseData[responseDataKey], id: responseDataKey})
              }
            }
            return postArray;
          }))
          .subscribe(data => {
           this.isFetching = false;
            this.loadedPosts = data;
          });
  }
}
