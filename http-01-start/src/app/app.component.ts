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
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {
  }

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, (error1 => {
      this.error = error1.message;
    }));
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(data => {
      this.isFetching = false;
      this.loadedPosts = data;
    }, (error => {
      this.error = error.message;
    }));
  }

  onClearPosts() {
    this.isFetching = true;
    this.postsService.clearPosts().subscribe(() => {
      this.isFetching = false;
      this.loadedPosts = [];
    });

  }

}
