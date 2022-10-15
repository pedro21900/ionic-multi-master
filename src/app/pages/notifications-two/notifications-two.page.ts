import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications-two',
  templateUrl: './notifications-two.page.html',
  styleUrls: ['./notifications-two.page.scss'],
})
export class NotificationsTwoPage implements OnInit {

  avatar = 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80';

  notifications = [
    {
      avatar: 'https://images.unsplash.com/photo-1556637641-0ac7101023f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'McDonalds sent you a 20% OFF voucher',
      date: new Date()
    },
    {
      avatar: 'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Hannah Smith sent you an invitation',
      date:  new Date(2020, 6, 10)
    },
    {
      avatar: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Roland McDonalds asked you to join in a group',
      date:  new Date(2020, 6, 1)
    },
    {
      avatar: 'https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Starbucks sent to an offer',
      date:  new Date(2020, 5, 25)
    },
    {
      avatar: 'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Maria Gutierrez asked you to join in a group',
      date:  new Date(2020, 4, 16)
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
