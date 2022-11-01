import { Component, OnInit } from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor( public splashScreen: SplashScreen) {
  }
  ionViewDidEnter() {
    this.splashScreen.hide();
    setTimeout(() => {

    }, 4000);
  }
  ngOnInit() {
  }

}
