import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {
  }

  ngOnInit() {
    this.isFetching = true;
  this.postsService.fetchPosts().subscribe(posts => {
    this.isFetching = false;
    this.loadedPosts = posts;
  });
  }

  onCreatePost(postData: { title: string; content: string }) {
this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(data => {
      this.isFetching = false;
      this.loadedPosts = data;
    });
  }

  onClearPosts() {
    // Send Http request
  }

}
