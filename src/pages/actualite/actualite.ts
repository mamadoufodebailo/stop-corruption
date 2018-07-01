import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ActualiteServiceProvider} from "../../providers/actualite-service/actualite-service";
import {DetailActualitePage} from "../detail-actualite/detail-actualite";

/**
 * Generated class for the ActualitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actualite',
  templateUrl: 'actualite.html',
})
export class ActualitePage {
  actus: any = {actualites:[]};
  page: number = 1;
  taille: number = 2;
  donnees : any;
  totalPages: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public actuService: ActualiteServiceProvider,
              public loadingCtrl:LoadingController) {

  }

  onSearch(){
    this.actuService.listeActualite(this.page,this.taille).subscribe(data=>{
      this.donnees = data;
      this.totalPages = this.donnees.nombre.nombre / this.taille;
      if (this.totalPages % this.taille != 0) ++this.totalPages;
      this.donnees.actualites.forEach(d => {
        this.actus.actualites.push(d);
      });
    },error=>{
      console.error(error);
    });
  }

  ionViewDidLoad() {
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

  voirPlus(actu){
    this.navCtrl.push(DetailActualitePage,{actus:actu})
  }

}
