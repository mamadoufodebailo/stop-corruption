import { Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TemoignageServiceProvider} from "../../providers/temoignage-service/temoignage-service";
import {DetailInformationPage} from "../detail-information/detail-information";

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {
  temoins : any = {temoignages:[]};
  page: number = 1;
  taille: number = 2;
  donnees : any;
  totalPages: number;

  constructor(public navCtrl: NavController,public navParams: NavParams,public temoignageService:TemoignageServiceProvider,
              public loadingCtrl: LoadingController) {
  }

  onSearch(){
    this.temoignageService.listeTemoignage(this.page,this.taille).subscribe(data=>{
      this.donnees = data;
      this.totalPages = this.donnees.nombre.nombre / this.taille;
      if (this.totalPages % this.taille != 0) ++this.totalPages;
      this.donnees.temoignages.forEach(d=>{
        this.temoins.temoignages.push(d);
      });
    },error => {
      console.error(error);
    });
  }

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      content: "Chargement des données..."
    });
    loading.present();
    this.onSearch();
    loading.dismiss();
  }

  doInfinite(event){
    if (this.page < this.totalPages){
      ++this.page;
      this.onSearch();
      event.complete();
    }
  }

  voirPlus(temoin){
    this.navCtrl.push(DetailInformationPage,{temoins:temoin});
  }

}
