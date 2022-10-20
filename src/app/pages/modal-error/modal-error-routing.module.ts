import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalErrorPage } from './modal-error-page.component';

const routes: Routes = [
  {
    path: '',
    component: ModalErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalErrorPageRoutingModule {}
