import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EquinoListPageRoutingModule } from './equino-list-routing.module';
import { EquinoListPage } from './equino-list-page.component';

import { ComponentsModule } from 'src/app/@shared/components/components.module';
import {BrMaskerModule} from 'br-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EquinoListPageRoutingModule,
        ComponentsModule,
        BrMaskerModule
    ],
  declarations: [EquinoListPage]
})
export class EquinoListPageModule {}
