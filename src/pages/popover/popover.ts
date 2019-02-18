import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DenonciationPage} from "../denonciation/denonciation";
import {InformationPage} from "../information/information";
import {ActualitePage} from "../actualite/actualite";
import {PopoverServiceProvider} from "../../providers/popover-service/popover-service";

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  photos : any;

  menus = [
    {name:"Signaler un acte",component:DenonciationPage},
    {name:"Témoignages",component:InformationPage},
    {name:"Actualités",component:ActualitePage}
    ];

  slogan = "pour une bonne gouvernance, je m'engage...";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverService:PopoverServiceProvider) {
  }

  goToPage(c){
    this.navCtrl.setRoot(c.component);
  }

  ionViewDidLoad() {
    this.popoverService.getSlides().subscribe(data=>{
      this.photos = data;
    });
  }

  ionViewDidEnter(){

  }

}
