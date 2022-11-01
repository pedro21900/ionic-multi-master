import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmptyStatesPageRoutingModule } from './empty-states-routing.module';
import { EmptyStatesPage } from './empty-states.page';
import { ComponentsModule } from '../../@shared/components/components.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmptyStatesPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [EmptyStatesPage]
})
export class EmptyStatesPageModule {}
