import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggingService {
  laslog: string;


  printLog(message: string) {
    console.log(message);
    console.log(this.laslog);
    this.laslog = message;
  }
}
