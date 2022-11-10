import {Component, OnInit} from '@angular/core';
import {Preferences} from '@capacitor/preferences';
import {UserChecked} from '../../services/validate-pf-or-pj.service';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userChecked: UserChecked;
  background = {
    backgroundImage: 'url(../../../assets/img/home-background.png)'
  };

  features = [
    {
      icon: 'phone-portrait-outline',
      text: 'Propriedades',
      routerLink: '/propriedade'
    },
    {
      icon: 'grid-outline',
      text: 'Passaporte',
      routerLink: '/'
    },
    {
      icon: 'build-outline',
      text: 'Configurações',
      routerLink: '/settings'
    },
  ];

  constructor(private userService:ConfigService) {
  }

  async ngOnInit() {
    this.userService.userLogged
        .subscribe(userLogged=> this.userChecked=userLogged)

  }

}
