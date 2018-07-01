import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-information',
  templateUrl: 'detail-information.html',
})
export class DetailInformationPage {
  temoin: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.temoin = this.navParams.data.temoins;
  }

  ionViewDidLoad() {

  }

}
