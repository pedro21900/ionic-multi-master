import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropriedadeListPage } from './propriedade-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: PropriedadeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropriedadeListPageRoutingModule {}
