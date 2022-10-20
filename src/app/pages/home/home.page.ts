import {Component, OnInit} from '@angular/core';
import {Preferences} from '@capacitor/preferences';
import {UserChecked} from '../../services/validate-pf-or-pj.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userChecked: UserChecked;
  background = {
    backgroundImage: 'url(../../../assets/img/home-background.jpg)'
  };

  features = [
    {
      icon: 'phone-portrait-outline',
      text: 'Baixar Propriedades',
      routerLink: '/'
    },
    {
      icon: 'grid-outline',
      text: 'Atualizar Passaporte',
      routerLink: '/'
    },
    {
      icon: 'shapes-outline',
      text: 'Vector based images',
      routerLink: '/'
    },
    {
      icon: 'build-outline',
      text: 'Configurações',
      routerLink: '/settings-three'
    },
    {
      icon: 'color-palette-outline',
      text: 'Custom colors',
      routerLink: '/'
    }
  ];

  constructor() {
  }

  async ngOnInit() {
    const userLogged = await Preferences.get({key: 'user'});
    this.userChecked = JSON.parse(userLogged.value);
  }

}
