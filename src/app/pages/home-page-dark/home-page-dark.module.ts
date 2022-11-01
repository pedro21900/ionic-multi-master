import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageDarkPageRoutingModule } from './home-page-dark-routing.module';

import { HomePageDarkPage } from './home-page-dark.page';
import { ComponentsModule } from 'src/app/@shared/components/components.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageDarkPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [HomePageDarkPage]
})
export class HomePageDarkPageModule {}
