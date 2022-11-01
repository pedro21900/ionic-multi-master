import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/@shared/components/components.module';
import { ModalArticlePageModule } from '../modal-article/modal-article.module';
import { ModalConfirmationPageModule } from '../modal-confirmation/modal-confirmation.module';
import { ModalLocationPageModule } from '../modal-location/modal-location.module';
import { ModalProfilePageModule } from '../modal-profile/modal-profile.module';
import { ModalSubscribePageModule } from '../modal-subscribe/modal-subscribe.module';
import { ModalsPageRoutingModule } from './modals-routing.module';
import { ModalsPage } from './modals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsPageRoutingModule,
    ComponentsModule,
    ModalArticlePageModule,
    ModalConfirmationPageModule,
    ModalLocationPageModule,
    ModalSubscribePageModule,
    ModalProfilePageModule
  ],
  declarations: [ModalsPage]
})
export class ModalsPageModule {}
