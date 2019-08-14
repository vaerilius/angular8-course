import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  submitForm: FormGroup;

  status = ['Stable', 'Critical', 'Finished'];
  forbiddenName = ['Test'];

  constructor() {
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'projectData': new FormGroup({
        // 'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'name': new FormControl(null, [Validators.required], this.forbiddenAsyncName),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl(null)
      })
    });
    this.submitForm.valueChanges.subscribe((value) => console.log(value));
  }

  submit() {
    console.log(this.submitForm);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenName.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } else {
      return null;
    }
  }

  forbiddenAsyncName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
