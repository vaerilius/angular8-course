import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';


export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');

    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
    return next.handle(modifiedRequest).pipe(tap(e => {
      console.log(e);
      if (e.type === HttpEventType.Response) {
        console.log('Response arrived, body data: ');
        console.log(e.body);

      }
    }));
  }

}
