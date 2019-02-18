import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PopoverPage } from '../pages/popover/popover';
import { HomePage } from '../pages/home/home';
import { InformationPage } from '../pages/information/information';
import { DenonciationPage } from '../pages/denonciation/denonciation';
import { ActualitePage } from '../pages/actualite/actualite';
import { PartenairePage } from '../pages/partenaire/partenaire';
import {ContactPage} from "../pages/contact/contact";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PopoverPage;

  menus = [
    {titre: "Informations",Component: HomePage},
    {titre: "Signaler un acte",Component: DenonciationPage},
    {titre: "Témoignages",Component: InformationPage},
    {titre: "Actualites",Component: ActualitePage},
    {titre: "Partenaires",Component: PartenairePage},
    {titre: "Contact",Component: ContactPage}
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(c:any){
    this.rootPage = c.Component;
  }

  getMenus(){
    return this.menus;
  }

}

