import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number, anotherArg: any, ...args): any {
    if (value.length > 10) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
