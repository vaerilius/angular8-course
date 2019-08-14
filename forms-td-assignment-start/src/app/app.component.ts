import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: false}) signIn: NgForm;
  submitted = false;
  subscriptions = ['basic', 'advanced', 'pro'];
  selected: 'advanced';

  onSubmit() {
  this.submitted = true;
    console.log(this.signIn);

    this.signIn.reset();
  }
}
