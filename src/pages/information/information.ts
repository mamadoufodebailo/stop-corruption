import { Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TemoignageServiceProvider} from "../../providers/temoignage-service/temoignage-service";
import {DetailInformationPage} from "../detail-information/detail-information";
import {Storage} from "@ionic/storage";
import {TemoignageModel} from "../../modeles/temoignage.model";
import {PopoverPage} from "../popover/popover";

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
  taille: number = 10;
  donnees : any;
  totalPages: number;

  constructor(public navCtrl: NavController,public navParams: NavParams,public temoignageService:TemoignageServiceProvider,
              public loadingCtrl: LoadingController,public storage:Storage) {
  }

  goToHome(){
    this.navCtrl.setRoot(PopoverPage);
  }

  onSearch(){
    this.temoignageService.listeTemoignage(this.page,this.taille).subscribe(data=> {
      this.donnees = data;

      this.totalPages = Math.ceil(this.donnees.nombre.nombre / this.taille);

      //if (this.totalPages % this.taille != 0) ++this.totalPages;

      this.donnees.temoignages.forEach(d=> {
        let temoignage = new TemoignageModel();

        temoignage.auteur = d.auteur;
        temoignage.fonction = d.fonction;
        temoignage.citation = d.citation;
        temoignage.photo = d.photo;

        this.temoins.temoignages.push(temoignage);
      });

      this.storage.set("temoignages",this.temoins.temoignages);
    },error=> {
      this.storage.get("temoignages").then(temoignages=> {
        this.donnees = temoignages;

        this.donnees.forEach(temoin=> {
          let temoignage = new TemoignageModel();

          temoignage.auteur = temoin.auteur;
          temoignage.fonction = temoin.fonction;
          temoignage.citation = temoin.citation;
          temoignage.photo = temoin.photo;

          this.temoins.temoignages.push(temoignage);
        });
      });
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
