import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsTwoPage } from './payments-two.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsTwoPageRoutingModule {}
