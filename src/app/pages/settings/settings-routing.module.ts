import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings-page.component';
import {SettingsProfilePage} from './settings-profile/settings-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'profile',
    component: SettingsProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
