import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {
  }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
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

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
