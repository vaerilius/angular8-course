import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f', {static: false}) signIn: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.username = suggestedName;

    // this.signIn.setValue({

    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //     secret: 'pet',
    //     questionAnswer: '',
    //     gender: 'male'
    //
    //   }
    // });
    this.signIn.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  // console.log(form.value);
  // }
  onSubmit() {
    console.log(this.signIn);
    this.submitted = true;
    this.user.username = this.signIn.value.userData.username;
    this.user.email = this.signIn.value.userData.email;
    this.user.secretQuestion = this.signIn.value.userData.secret;
    this.user.answer = this.signIn.value.userData.questionAnswer;
    this.user.gender = this.signIn.value.userData.gender;

    this.signIn.reset();

    // this.signIn.form.patchValue({
    //   userData: {
    //     username: ''
    //   }
    // });
  }
}
