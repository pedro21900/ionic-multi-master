import { Component, OnInit, ViewChild } from '@angular/core';
import Swiper, { SwiperOptions, Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-onboarding-one',
  templateUrl: './onboarding-one.page.html',
  styleUrls: ['./onboarding-one.page.scss'],
})
export class OnboardingOnePage implements OnInit {
  btnText = 'Prev';

  data = [
    {
      img: 'slide-one',
      title: 'Application screens ready to use',
      text: '20+ prebuilt screens to save you countless hours while writing boilerplate code',
    },
    {
      img: 'slide-two',
      title: 'Payment screens with credit card validators',
      text: 'Build your app in record time with our prebuild screens and reusable components',
    },
    {
      img: 'slide-three',
      title: 'Several screens with custom components',
      text: 'High Quality screens with modern design patterns with latest trends in mind',
    },
  ];
  
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;


  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true
  };
  
  constructor() {}

  ngOnInit() {
    Swiper.use([Pagination]);
  }

  slideNext(){
    this.swiper.swiperRef.slideNext(500);
  }
  slidePrev(){
    this.swiper.swiperRef.slidePrev(500);
  }
}
