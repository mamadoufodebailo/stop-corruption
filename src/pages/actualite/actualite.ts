import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ActualiteServiceProvider} from "../../providers/actualite-service/actualite-service";
import {DetailActualitePage} from "../detail-actualite/detail-actualite";
import {Storage} from "@ionic/storage";
import {ActualiteModel} from "../../modeles/actualite.model";
import {PopoverPage} from "../popover/popover";

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
  taille: number = 10;
  donnees : any;
  totalPages: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl:LoadingController,public storage: Storage,
              public actualiteService: ActualiteServiceProvider) {

  }

  onSearch(){
    this.actualiteService.listeActualite(this.page,this.taille).subscribe(data=> {
      this.donnees = data;

      this.totalPages = Math.ceil(this.donnees.nombre.nombre / this.taille);

      //if (this.totalPages % this.taille != 0) ++this.totalPages;

      this.donnees.actualites.forEach(d=> {
        let actualite = new ActualiteModel();

        actualite.titre = d.titre;
        actualite.description = d.description;
        actualite.contenu = d.contenu;
        actualite.photo = d.photo;
        actualite.datePublie = d.datePublie;

        this.actus.actualites.push(actualite);
      });

      this.storage.set("actualites",this.actus.actualites);
    },error=> {
      this.storage.get("actualites").then(actualites=> {
        this.donnees = actualites;

        this.donnees.forEach(actu=> {
          let actualite = new ActualiteModel();

          actualite.titre = actu.titre;
          actualite.description = actu.description;
          actualite.contenu = actu.contenu;
          actualite.photo = actu.photo;
          actualite.datePublie = actu.datePublie;

          this.actus.actualites.push(actualite);
        });
      });
    });
  }

  goToHome(){
    this.navCtrl.setRoot(PopoverPage);
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
