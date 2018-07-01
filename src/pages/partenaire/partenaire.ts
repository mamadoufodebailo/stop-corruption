import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PartenaireServiceProvider} from "../../providers/partenaire-service/partenaire-service";

/**
 * Generated class for the PartenairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partenaire',
  templateUrl: 'partenaire.html',
})
export class PartenairePage {
  photos : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public partenaire:PartenaireServiceProvider) {
  }

  ionViewDidLoad() {
    this.partenaire.listePartenaire().subscribe(data=>{
      this.photos = data;
    },error=>{
      console.log(error);
    });
  }

}
