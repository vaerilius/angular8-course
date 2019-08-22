import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

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

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy85lcn8JFrV4u1I36sreqfyeeyiVJI2Y',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCy85lcn8JFrV4u1I36sreqfyeeyiVJI2Y',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError)
      );
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
