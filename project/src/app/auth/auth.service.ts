import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean

}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
        }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
          }
        )
      );
  }

  private handleAuthentication(email: string, userId: string, toke: string, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      toke,
      expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errMessage = 'An unknown error occurred';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errMessage)
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'EMAIL_EXISTS';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'EMAIL_NOT_FOUND';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'INVALID_PASSWORD';
        break;
      case 'USER_DISABLED':
        errMessage = 'USER_DISABLED';
        break;
    }
    return throwError(errMessage)
  }


}
