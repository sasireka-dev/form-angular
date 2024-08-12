import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserName = ['Chris', 'Anna'];


  assignmentForm: FormGroup;




  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      }),
      gender: new FormControl('male'),
      hobby: new FormArray([])
    });
    // this.signUpForm.valueChanges.subscribe((value) => {
    //   console.log(value)
    // })
    // this.signUpForm.get('userData.email').statusChanges.subscribe((value) => {
    //   console.log(value)
    // })

    this.signUpForm.setValue({
      userData: {
        username: 'Sasi',
        email: 'sasi@test.com'
      },
      gender: 'male',
      hobby: []
    })

    this.signUpForm.patchValue({
      userData: {
        username: 'nnn'
      }
    })


    this.assignmentForm = new FormGroup({
      name: new FormControl(null, Validators.required, this.asyncTestNoValidator),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('stable')
    })
  }
  onSubmit() {
    console.log(this.signUpForm.value);
    this.signUpForm.reset();
  }
  onAddHobby() {
    (<FormArray>this.signUpForm.get('hobby')).push(new FormControl(null, Validators.required))
  }
  getControls() {
    return (<FormArray>this.signUpForm.get('hobby')).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true }
    }
    else {
      return null;
    }
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true })
        }
        else {
          resolve(null);
        }
      }, 1000)
    })
    return promise
  }

  onSubmit2() {
    console.log(this.assignmentForm.valid);
  }

  // testNoValidator(control: FormControl): { [s: string]: boolean } {
  //   if (control.value === 'test') {
  //     return { forbid: true }
  //   }
  //   else {
  //     return null;
  //   }
  // }

  asyncTestNoValidator(control: FormControl): Promise<any> | Observable<any> {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({ forbid: true })
        }
        else {
          resolve(null)
        }
      }, 1000)
    })
    return p
  }
}
