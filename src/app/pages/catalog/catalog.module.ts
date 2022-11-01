import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CatalogPageRoutingModule } from './catalog-routing.module';
import { CatalogPage } from './catalog.page';

import { ComponentsModule } from 'src/app/@shared/components/components.module';
import {BrMaskerModule} from 'br-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CatalogPageRoutingModule,
        ComponentsModule,
        BrMaskerModule
    ],
  declarations: [CatalogPage]
})
export class CatalogPageModule {}
