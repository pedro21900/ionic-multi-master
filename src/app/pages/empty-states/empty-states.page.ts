import { Component, OnInit } from '@angular/core';
import Swiper, { Pagination, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-empty-states-page',
  templateUrl: './empty-states.page.html',
  styleUrls: ['./empty-states.page.scss'],
})
export class EmptyStatesPage implements OnInit {

  empty = [
    {
      image: 'assets/illustrations/internet.svg',
      title: 'Sem acesso a internet',
      caption: 'Verifique sua conexão com a Internet e tente novamente'
    }
    // {
    //   image: 'assets/illustrations/orders.svg',
    //   title: 'No orders placed',
    //   caption: 'Start shopping today with our amazing offers'
    // },
    // {
    //   image: 'assets/illustrations/chats.svg',
    //   title: 'Nothing to show',
    //   caption: 'Start conversations with your friends'
    // },
    // {
    //   image: 'assets/illustrations/location.svg',
    //   title: 'No location available',
    //   caption: 'Turn on your location to give you the best options'
    // },
    // {
    //   image: 'assets/illustrations/messages.svg',
    //   title: 'No messages to show',
    //   caption: 'Send a message and start a thread'
    // }
  ];

  slideConfig: SwiperOptions = {
    slidesPerView: 1,
    pagination: false
  };

  constructor() { }

  ngOnInit() {
    Swiper.use([Pagination]);
  }

}
