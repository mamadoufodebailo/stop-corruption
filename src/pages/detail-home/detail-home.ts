import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-home',
  templateUrl: 'detail-home.html',
})
export class DetailHomePage {
  info: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = this.navParams.data.infos;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailHomePage');
  }

}
