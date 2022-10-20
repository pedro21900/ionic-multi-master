import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalErrorPageRoutingModule } from './modal-error-routing.module';

import { ModalErrorPage } from './modal-error-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalErrorPageRoutingModule
  ],
  declarations: [ModalErrorPage]
})
export class ModalErrorPageModule {}
