import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {HomeServiceProvider} from "../../providers/home-service/home-service";
import {DetailHomePage} from "../detail-home/detail-home";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  infos : any = {informations:[]};
  page: number = 1;
  taille: number = 2;
  donnees : any;
  totalPages: number;

  constructor(public navCtrl: NavController,public homeService: HomeServiceProvider,public loadingCtrl: LoadingController) {

  }

  onSearch(){
    this.homeService.listeInformation(this.page,this.taille).subscribe(data=>{
      this.donnees = data;
      this.totalPages = this.donnees.nombre.nombre / this.taille;
      if (this.totalPages % this.taille != 0) ++this.totalPages;
      this.donnees.informations.forEach(d=>{
        this.infos.informations.push(d);
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
      console.log(this.page+"/"+this.totalPages);
      this.onSearch();
      event.complete();
    }
  }

  voirPlus(info){
    this.navCtrl.push(DetailHomePage,{infos:info});
  }


}
