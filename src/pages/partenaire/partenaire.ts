import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PartenaireServiceProvider} from "../../providers/partenaire-service/partenaire-service";
import {Storage} from "@ionic/storage";
import {PartenaireModel} from "../../modeles/partenaire.model";
import {PopoverPage} from "../popover/popover";

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
  photos : any = {partenaires:[]};
  donnees: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public partenaireService: PartenaireServiceProvider,public storage: Storage) {
  }

  goToHome(){
    this.navCtrl.setRoot(PopoverPage);
  }

  ionViewDidLoad() {
    this.partenaireService.listePartenaire().subscribe(data=> {
      this.donnees =  data;

      this.donnees.partenaires.forEach(d=>{
        let partenaire = new PartenaireModel();
        partenaire.nom = d.nom;
        partenaire.image = d.image;

        this.photos.partenaires.push(partenaire);
      })

      this.storage.set("partenaires",this.photos.partenaires);
    },error=>{
      this.storage.get("partenaires").then(partenaires=>{
        this.donnees = partenaires;

        this.donnees.forEach(part=>{
          let partenaire = new PartenaireModel();

          partenaire.nom = part.nom;
          partenaire.image = part.image;

          this.photos.partenaires.push(partenaire);
        })
      });
    });
  }

}
