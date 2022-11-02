import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EquinoEditPageRoutingModule } from './equino-routing.module';
import { EquinoEditPage } from './equino-edit/equino-edit-cadastro/equino-edit-page.component';

import { ComponentsModule } from 'src/app/@shared/components/components.module';
import {BrMaskerModule} from 'br-mask';
import {EquinoPage} from './equino-page.component';
import {EquinoListPage} from './equino-list/equino-list-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EquinoEditPageRoutingModule,
        ComponentsModule,
        BrMaskerModule
    ],
  declarations: [EquinoPage,EquinoEditPage,EquinoListPage]
})
export class EquinoPageModule {}
