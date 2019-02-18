import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {DetailHomePage} from "../detail-home/detail-home";
import {HomeServiceProvider} from "../../providers/home-service/home-service";
import {Storage} from "@ionic/storage";
import {HomeModel} from "../../modeles/home.model";
import {PopoverPage} from "../popover/popover";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  infos : any = {informations:[]};
  page: number = 1;
  taille: number = 10;
  donnees : any;
  totalPages: number;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
              public homeService: HomeServiceProvider,public storage: Storage) {
  }

  onSearch(){
    this.homeService.listeInformation(this.page,this.taille).subscribe(data=> {
      this.donnees = data;

      this.totalPages = Math.ceil(this.donnees.nombre.nombre / this.taille);

      //this.infos.informations.length = 0;

      //if (this.totalPages % this.taille != 0) ++this.totalPages;

      this.donnees.informations.forEach(d=> {
        let information = new HomeModel();

        information.titre = d.titre;
        information.description = d.description;
        information.contenu = d.contenu;
        information.photo = d.photo;
        information.datePublie = d.datePublie;

        this.infos.informations.push(information);
      });

      this.storage.set("informations",this.infos.informations);
    },error=> {
      this.storage.get("informations").then(informations=> {
        this.donnees = informations;

        this.donnees.forEach(info=> {
          let information = new HomeModel();

          information.titre = info.titre;
          information.description = info.description;
          information.contenu = info.contenu;
          information.photo = info.photo;
          information.datePublie = info.datePublie;

          this.infos.informations.push(information);
        });
      });
    });
  }

  /*onSearch(){
    this.homepageService.listeInformation(this.page,this.taille).subscribe(data=>{
      this.donnees = data;

      if (this.donnees){
        this.storage.set("actualites",data);
      }

      this.totalPages = this.donnees.nombre.nombre / this.taille;
      if (this.totalPages % this.taille != 0) ++this.totalPages;
      this.donnees.informations.forEach(d=> {
        this.infos.informations.push(d);
      });
    },error => {
      console.log("Offline");
      this.storage.get("actualites").then(actus=> {
        this.donnees = actus;

        this.donnees.informations.forEach(info=> {
          this.infos.informations.push(info);
        });
      });
    });
  }*/

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      content: "Chargement des données..."
    });

    loading.present();

    this.onSearch();

    loading.dismiss();
  }

  goToHome(){
    this.navCtrl.setRoot(PopoverPage);
  }

  doInfinite(event){
    if (this.page < this.totalPages){
      ++this.page;
      this.onSearch();
      event.complete();
    }
  }

  voirPlus(info){
    this.navCtrl.push(DetailHomePage,{infos:info});
  }


}
