import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginTwoPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {BrMaskerModule} from 'br-mask';
import {SetTypeProfilePage} from './set-type-profile/set-type-profile.page';
import {LoginValidationPage} from './login-validation/login-validation-page.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        LoginTwoPageRoutingModule,
        BrMaskerModule,
        FormsModule,
    ],
    declarations: [SetTypeProfilePage, LoginValidationPage, LoginPage]
})
export class LoginPageModule {
}
