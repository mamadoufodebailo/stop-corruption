import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FileUploadOptions, Transfer, TransferObject} from "@ionic-native/transfer";
import {FileChooser} from "@ionic-native/file-chooser";

/**
 * Generated class for the SuiteDenonciationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suite-denonciation',
  templateUrl: 'suite-denonciation.html',
})
export class SuiteDenonciationPage {
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public fileChooser: FileChooser,public  transfer: Transfer,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SuiteDenonciationPage');
  }

  uploadFile(){
    this.fileChooser.open().then(uri=> {
      let extension = uri.substr(uri.lastIndexOf('.') + 1);

      if (extension == 'pdf'){
        const fileTranfer: TransferObject = this.transfer.create();

        let options : FileUploadOptions = {
          fileKey: 'file',
          fileName: 'denonce.php',
          mimeType: 'application/pdf'
        }

        let loading = this.loadingCtrl.create({
          content: "Veuillez Patienter..."
        });

        loading.present();

        fileTranfer.upload(uri,'http://senacte.com/stop-corruption/api/upload.php',options).then(data=> {
          this.message = "Le fichier est bien envoyé !";
          document.getElementById("fichier").setAttribute("disabled","disabled");
        },err=> {
          this.message = "Le fichier n'est pas correctement charger !";
        })

        loading.dismiss();
      }

    }).catch(error=>{
      this.message = 'Impossible de charger le fichier !';
    })
  }

  selectPDF(){
    let alert = this.alertCtrl.create({
      title: 'Uploader un fichier',
      message: '',
      buttons: [
        {text: 'Télécharger PDF', handler: () => {this.uploadFile();}},
        {text: 'Annuler', handler: () => {alert.dismiss()}}
        ]
    })

    alert.present();
  }

}
