import { Component, OnInit } from '@angular/core';
import Swiper, { Pagination, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-onboarding-two',
  templateUrl: './onboarding-two.page.html',
  styleUrls: ['./onboarding-two.page.scss'],
})
export class OnboardingTwoPage implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
  };

  data = [
    {
      image: 'wecome-slide-one',
      title: 'Bem-vindo ao Siapec3 pe',
      description:
        'O SIAPEC3 Passaporte Equestre é uma solução desenvolvida para o controle da rastreabilidade equina.',
    },
    {
      image: 'wecome-slide-two',
      title: 'Facilitar',
      description:
        'A Ferramenta que substitui uma série de documentos que precisavam ser apresentados pelos criadores e profissionais veterinários nas operações de movimentação de equídeos.',
    }
  ];

  constructor() {}

  ngOnInit() {
    Swiper.use([Pagination]);
  }
}
