import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquinoEditPage } from './equino-edit/equino-edit-cadastro/equino-edit-page.component';
import {EquinoPage} from './equino-page.component';
import {EquinoListPage} from './equino-list/equino-list-page.component';

const routes: Routes = [
  {path: '', component: EquinoPage, children: [
      {path: '', component: EquinoListPage },
    ]},
  {
    path: 'edit', children: [
      {path: '', component: EquinoEditPage},
      {path: ':idEquino', component: EquinoEditPage},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquinoEditPageRoutingModule {}
