import {Component, OnInit} from '@angular/core';

import {MenuController, ModalController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SQLiteService} from './services/sql-lite.service';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Preferences} from '@capacitor/preferences';
import {environment} from '../environments/environment';
import {UserChecked} from './services/validate-pf-or-pj.service';
import {Router} from '@angular/router';
import {Network} from '@capacitor/network';
import {ConfigService} from './services/config.service';
import {ServerApiResourceRepository} from './repositories/server-api-resource.repository';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      icon: 'home-outline',
      url: '/home',
      open: true
    },
    {
      title: 'Onboarding',
      icon: 'rocket-outline',
      open: false,
      children: [
        {
          title: 'Dark w/ buttons',
          url: '/onboarding-one',
        },
        {
          title: 'w/ CTA button',
          url: '/onboarding-two',
        },
      ],
    },
    {
      title: 'Home Pages',
      icon: 'grid-outline',
      open: false,
      isNew: true,
      children: [
        {
          title: 'Dark w/ slides',
          url: '/home-page-dark',
        },
        {
          title: 'Big Cards',
          url: '/home-page-cards',
        },
        {
          title: 'E-commerce',
          url: '/home-page-store',
        },
      ],
    },
    {
      title: 'Login',
      icon: 'enter-outline',
      open: false,
      children: [
        {
          title: 'Fullscreen Image',
          url: '/login-one',
        },
        {
          title: 'Image Background',
          url: '/login',
        },
        {
          title: 'Basic Form',
          url: '/login-three',
        },
      ],
    },
    {
      title: 'Sign Up',
      icon: 'key-outline',
      open: false,
      children: [
        {
          title: 'Fullscreen Image',
          url: '/sign-one',
        },
        {
          title: 'Image Background',
          url: '/sign-two',
        },
        {
          title: 'Basic with social buttons',
          url: '/sign-three',
        },
      ],
    },
    {
      title: 'Profile',
      icon: 'person-outline',
      open: false,
      children: [
        {
          title: 'w/ Gallery',
          url: '/profile-one',
        },
        {
          title: 'w/ Categories',
          url: '/profile-two',
        },
        {
          title: 'w/ Tabs',
          url: '/profile-three',
        },
      ],
    },
    {
      title: 'Feed',
      icon: 'newspaper-outline',
      open: false,
      children: [
        {
          title: 'News Blocks',
          url: '/feed-one',
        },
        {
          title: 'Block Cards',
          url: '/feed-two',
        },
        {
          title: 'w/ Stories',
          url: '/feed-three',
        },
      ],
    },
    {
      title: 'Article',
      icon: 'document-text-outline',
      open: false,
      children: [
        {
          title: 'Fullscreen Article',
          url: '/article-one',
        },
        {
          title: 'w/ Image and quote',
          url: '/article-two',
        },
        {
          title: 'w/ Background color',
          url: '/article-three',
        },
      ],
    },
    {
      title: 'Ecommerce',
      icon: 'cart-outline',
      open: false,
      children: [
        {
          title: 'Catalog',
          url: '/catalog',
        },
        {
          title: 'Product Detail',
          url: '/product-detail',
        },
        {
          title: 'Product Detail II',
          url: '/product-detail-two',
          isNew: true
        },
        {
          title: 'Favorites',
          url: '/favorites',
        },
        {
          title: 'Shopping Cart',
          url: '/shopping-cart',
        },
      ],
    },
    {
      title: 'Payment',
      icon: 'card-outline',
      open: false,
      children: [
        {
          title: 'w/ Input Validator',
          url: '/payments-one',
        },
        {
          title: 'w/ Credit Card',
          url: '/payments-two',
        },
      ],
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      open: false,
      children: [
        {
          title: 'Basic',
          url: '/notifications-one',
        },
        {
          title: 'w/ Header and buttons',
          url: '/notifications-two',
        },
      ],
    },
    {
      title: 'Utils',
      icon: 'cube-outline',
      open: false,
      isNew: true,
      children: [
        {
          title: 'Filters',
          url: '/filter',
        },
        {
          title: 'Modals',
          url: '/modals',
        },
        {
          title: 'Empty States',
          url: '/empty-states',
        },
      ],
    },
    {
      title: 'Settings',
      icon: 'settings-outline',
      open: false,
      children: [
        {
          title: 'w/ Colour Icons',
          url: '/settings',
        },
        {
          title: 'Basic Settings',
          url: '/settings-two',
        },
        {
          title: 'w/ Profile Header',
          url: '/settings/profile',
        },
      ],
    },
  ];

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private modalCtrl: ModalController,
      private statusBar: StatusBar,
      public menu: MenuController,
      private sqLiteService: SQLiteService,
      private router: Router,
      private configService:ConfigService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      await this.initializeCapacitorSqlite();
      await this.verifyFirstExec();
    });
  }

  ngOnInit() {}

  toggleSectionMenu(value: any, index: number) {
    if(this.selectedIndex == index && value.open == true)  {
      value.open = false;
    } else if(this.selectedIndex == index && value.open == false){
      value.open = true;
    } else {
      this.appPages[this.selectedIndex].open = false;
      value.open = !value.open;
      this.selectedIndex = index;
    }
  }

  async initializeCapacitorSqlite() {
    await this.sqLiteService.initializePlugin().then(async ret => {
      console.log(`CapacitorSqlite está ${ret ? 'Ativo' : 'Inativo'}`);
      const dbSetupDone = await Preferences.get({key: 'db_name'});
      if (!dbSetupDone.value) {
        await this.sqLiteService.downloadDatabase(false, `${environment.apiUrl}/consulta/estadosPassaporteEquestre`);
        await this.sqLiteService.openConnection(environment.databaseName, true, 'no-encryption', 1,false);
      } else {
        await this.sqLiteService.openConnection(environment.databaseName, true, 'no-encryption', 1,false)
      }
    });
  }

  async verifyFirstExec() {
    const user = await Preferences.get({key: 'user'});
    const userLogged: UserChecked = JSON.parse(user.value);
    const connectionNetwork:boolean =await this.checkConnectionNetwork(userLogged);
    if ( userLogged == null && connectionNetwork)  this.router.navigate(['onboarding-two'], {replaceUrl: true});
    else {
      this.configService.urlBase.subscribe(async urlBase => {
        await this.sqLiteService.downloadDatabase(true , `${urlBase}rest/passaporteEquestre/criacaoTabelasSqlite`);
        await this.sqLiteService.downloadDatabase(true, `${urlBase}rest/passaporteEquestre/sincronismoInicial`);
        this.router.navigate(['home'], {replaceUrl: true});
      })

    }
  }

  private async checkConnectionNetwork(userLogged:UserChecked) :Promise<boolean>{
    const statusNetwork = await Network.getStatus();
    if(!statusNetwork.connected && userLogged==null) {
      this.router.navigate(['empty-states'], { replaceUrl: true });
      return false;
    } return true;
  }
}
