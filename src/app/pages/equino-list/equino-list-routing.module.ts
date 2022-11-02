import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquinoListPage } from './equino-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: EquinoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquinoListPageRoutingModule {}
