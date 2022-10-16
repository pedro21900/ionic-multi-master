import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-login-two',
  templateUrl: './login-two.page.html',
  styleUrls: ['./login-two.page.scss'],
})
export class LoginTwoPage implements OnInit {

  loginForm: FormGroup;

  background = {
    backgroundImage: 'url(../../../assets/img/splashbg.png)'
  };
  $estadoConfigService: any = [{ds_estado:'Rio de Janeiro'},{ds_estado:'Pará'}];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      estado: [null, [Validators.required]],
      cpfAndCpnj: [null, [Validators.required]],
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
