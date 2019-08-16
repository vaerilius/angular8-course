import {Pipe, PipeTransform} from '@angular/core';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, propName: string): any {
    return value.sort((v1, v2) => {

      if (v1[propName] > v2[propName]) {
        return 1;
      } else {
        return -1;
      }

    });
  }

}



