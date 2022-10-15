import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingTwoPageRoutingModule } from './onboarding-two-routing.module';

import { OnboardingTwoPage } from './onboarding-two.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingTwoPageRoutingModule,
    SwiperModule
  ],
  declarations: [OnboardingTwoPage]
})
export class OnboardingTwoPageModule {}
