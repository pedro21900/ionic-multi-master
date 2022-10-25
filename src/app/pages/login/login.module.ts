import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginTwoPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {BrMaskerModule} from 'br-mask';
import {LoginSetTypeProfilePage} from './login-set-type-profile/login-set-type-profile.page';
import {LoginValidationPage} from './login-validation/login-validation.page.';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        LoginTwoPageRoutingModule,
        BrMaskerModule,
        FormsModule,
    ],
    declarations: [LoginSetTypeProfilePage, LoginValidationPage, LoginPage]
})
export class LoginPageModule {
}
