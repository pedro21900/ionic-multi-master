import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-three',
  templateUrl: './settings-profile-page.component.html',
  styleUrls: ['./settings-profile-page.component.scss'],
})
export class SettingsProfilePage implements OnInit {

  menu = [
    {
      icon: 'cart-outline',
      title: 'My Shopping Cart',
      subtitle: '5 items ready to process',
    },
    {
      icon: 'document-outline',
      title: 'My Orders',
      subtitle: '2 orders ready to process',
    },
    {
      icon: 'map-outline',
      title: 'My Addresses',
      subtitle: '3 addresses',
    },
    {
      icon: 'card-outline',
      title: 'My Payments Methods',
      subtitle: '3 methods registered',
    },
    {
      icon: 'settings-outline',
      title: 'App Settings',
      subtitle: 'Customize your app experience',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
