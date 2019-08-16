import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post(
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
    this.http.get('https://ng-complete-guide-b5dcc.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postArray = [];
        for (let responseDataKey in responseData) {
          if (responseData.hasOwnProperty(responseDataKey)) {
            postArray.push({...responseData[responseDataKey], id: responseDataKey})
          }
        }
        return postArray;
      }))
      .subscribe(data => {
        console.log(data);
      });
  }
}
