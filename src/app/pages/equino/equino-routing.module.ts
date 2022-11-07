import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EquinoPage} from './equino-page.component';
import {EquinoListPage} from './equino-list/equino-list-page.component';
import {EquinoEditPage} from './equino-edit/equino-edit-page.component';
import {EquinoEditCadastroPage} from './equino-edit/equino-edit-cadastro/equino-edit-cadastro-page.component';

const routes: Routes = [
  {path: '', component: EquinoPage, children: [
      {path: '', component: EquinoListPage },
    ]},
  {
    path: 'edit',component: EquinoEditPage , children: [
      {path: '', component: EquinoEditCadastroPage},
      {path: ':idEquino', component: EquinoEditCadastroPage},
      {path: 'resenha', component: EquinoEditPage},
      {path: 'resenha/:idEquino', component: EquinoEditPage},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquinoEditPageRoutingModule {}
