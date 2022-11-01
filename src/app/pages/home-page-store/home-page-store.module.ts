import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageStorePageRoutingModule } from './home-page-store-routing.module';
import { ComponentsModule } from 'src/app/@shared/components/components.module';
import { HomePageStorePage } from './home-page-store.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageStorePageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [HomePageStorePage]
})
export class HomePageStorePageModule {}
