import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-login-three',
  templateUrl: './login-three.page.html',
  styleUrls: ['./login-three.page.scss'],
})
export class LoginThreePage implements OnInit {

  loginForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });
  }

  signIn() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      console.log('invalid');
    }
  }

}
