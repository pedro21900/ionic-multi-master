import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginPage} from './login.page';
import {SetTypeProfilePage} from './set-type-profile/set-type-profile.page';
import {LoginValidationPage} from './login-validation/login-validation-page.component';

const routes: Routes = [
  {
    path: '',
    component: SetTypeProfilePage
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
