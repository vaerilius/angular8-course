import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClientModule) {
  }


}
