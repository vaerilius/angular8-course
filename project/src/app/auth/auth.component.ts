import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    console.log(authForm.value);
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(email, password).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;

      }, error => {
        console.log(error.message);
        this.error = error.message;
        this.isLoading = false;
      });
    }

    authForm.reset();
  }
}
