import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-login-one',
  templateUrl: './login-one.page.html',
  styleUrls: ['./login-one.page.scss'],
})
export class LoginOnePage implements OnInit {

  loginForm: UntypedFormGroup;

  background = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1579033462043-0f11a7862f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80)'
  };

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
      faceID: [false]
    });
  }

  signIn() {
    if (this.loginForm.valid) {
      // do something
    } else {
      // do something
    }
  }
}
