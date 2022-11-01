import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileTwoPageRoutingModule } from './profile-two-routing.module';

import { ProfileTwoPage } from './profile-two.page';
import { ComponentsModule } from 'src/app/@shared/components/components.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileTwoPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [ProfileTwoPage]
})
export class ProfileTwoPageModule {}
