import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EquinoEditPageRoutingModule } from './equino-routing.module';

import { ComponentsModule } from 'src/app/@shared/components/components.module';
import {BrMaskerModule} from 'br-mask';
import {EquinoPage} from './equino-page.component';
import {EquinoListPage} from './equino-list/equino-list-page.component';
import {EquinoEditPage} from './equino-edit/equino-edit-page.component';
import {EquinoEditCadastroPage} from './equino-edit/equino-edit-cadastro/equino-edit-cadastro-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        EquinoEditPageRoutingModule,
        ComponentsModule,
        BrMaskerModule
    ],
    declarations: [
        EquinoPage,
        EquinoListPage,
        EquinoEditPage,
        EquinoEditCadastroPage
    ]
})
export class EquinoPageModule {}
