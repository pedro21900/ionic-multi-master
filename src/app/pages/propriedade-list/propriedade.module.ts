import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PropriedadeListPageRoutingModule } from './propriedade-list-routing.module';
import { PropriedadeListPage } from './propriedade-list-page.component';

import { ComponentsModule } from 'src/app/@shared/components/components.module';
import {BrMaskerModule} from 'br-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PropriedadeListPageRoutingModule,
        ComponentsModule,
        BrMaskerModule
    ],
  declarations: [PropriedadeListPage]
})
export class PropriedadeListPageModule {}
