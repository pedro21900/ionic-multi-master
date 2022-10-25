import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginPage} from './login.page';
import {LoginSetTypeProfilePage} from './login-set-type-profile/login-set-type-profile.page';
import {LoginValidationPage} from './login-validation/login-validation.page.';

const routes: Routes = [
  {
    path: '',
    component: LoginSetTypeProfilePage
  },
  {
    path: 'validation',
    component: LoginValidationPage
  },
  {
    path: 'autentication',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginTwoPageRoutingModule {}
