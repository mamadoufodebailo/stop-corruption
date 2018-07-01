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
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PopoverPage;

  menus = [
    {titre: "Acceuil",Component: HomePage},
    {titre: "Dénoncer",Component: DenonciationPage},
    {titre: "Témoignage",Component: InformationPage},
    {titre: "Actualite",Component: ActualitePage},
    {titre: "Partenaire",Component: PartenairePage}
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

