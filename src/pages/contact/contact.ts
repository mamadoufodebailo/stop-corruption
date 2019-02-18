import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ContactServiceProvider} from "../../providers/contact-service/contact-service";
import {ContactModel} from "../../modeles/contact.model";
import {PopoverPage} from "../popover/popover";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contact: ContactModel = new ContactModel();

  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ContactService:ContactServiceProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ContactPage');
  }

  soumettre(){
    this.ContactService.ajouterMessage(JSON.stringify(this.contact)).subscribe(data=>{
      this.message = "Envoi reussi !";
    },error1 => {
      this.message = "Probleme de connexion !";
    });
    this.initialiser();
  }

  goToHome(){
    this.navCtrl.setRoot(PopoverPage);
  }

  initialiser(){
    this.contact.nom = "";
    this.contact.email = "";
    this.contact.sujet = "";
    this.contact.telephone = "";
    this.contact.message = "";
  }
}
