import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailActualitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-actualite',
  templateUrl: 'detail-actualite.html',
})
export class DetailActualitePage {
  actu: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.actu = this.navParams.data.actus;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailActualitePage');
  }

}
