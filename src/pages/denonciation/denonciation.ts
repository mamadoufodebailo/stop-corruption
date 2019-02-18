import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { DenoncerServiceProvider } from '../../providers/denoncer-service/denoncer-service';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Transfer} from "@ionic-native/transfer";
import {File} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser";
import {DenonceModel} from "../../modeles/denoncer.modele";
import {PopoverPage} from "../popover/popover";

/**
 * Generated class for the DenonciationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-denonciation',
  templateUrl: 'denonciation.html',
})
export class DenonciationPage {
  denonce: DenonceModel = new DenonceModel();

  departements: any;
  actes : any;
  regions : any;
  secteurs: any;
  photos = [];
  photo: any;

  path: any;
  message: any;
  resultat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public denonceService:DenoncerServiceProvider,public alert:AlertController
              ,public camera:Camera,public file:File,public alertCtrl: AlertController,public loading:LoadingController,
              public fileChooser:FileChooser,public transfer: Transfer) {
  }

  ionViewDidLoad() {
    this.denonceService.listeActe().subscribe(data=>{
      this.actes = data;
    },error=>{
      console.error(error);
    });
    this.denonceService.listeRegion().subscribe(data=>{
      this.regions = data;
    },error=>{
      console.error(error);
    });
    this.denonceService.listeSecteur().subscribe(data=>{
      this.secteurs = data;
    },error=>{
      console.error(error);
    });
  }

  ngOnInit(){

  }

  onchange(region){
    this.denonceService.listeVilleParRegion(region).subscribe(data=>{
      this.departements = data;
      document.getElementById("ville").style.display = "block";
    },error=>{
      console.error(error);
    });
  }

  takeImage(){
    const options1 : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit:true,
      targetHeight: 320,
      targetWidth: 240
    }

    const options2 : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true,
      targetHeight: 320,
      targetWidth: 240
    }

    let alert = this.alertCtrl.create({
      title: "Source",
      subTitle:"La source de photo",
      buttons: [
        {text:'Camera', handler:()=>{this.choicePhoto(options1);}},
        {text:'Galérie', handler:()=>{this.choicePhoto(options2);}}
      ]
    })

    alert.present();
  }

  choicePhoto(options){
    this.camera.getPicture(options).then(data=>{
      if (this.photos.length <= 4){
        this.photos.push('data:image/png;base64,'+data);
        this.photo = this.photos[this.photos.length - 1];
        this.denonce.photo = this.photos;
      }
      else {
        this.message = "Vous pouvez pas dépasser 4 éléments !";
      }

    }).catch(error=>{
      console.error(error);
    });
  }

  takeFile(){
    this.fileChooser.open().then(uri=>{

    }).catch(error=>{
      this.message = "Le fichier n'est pas correctement charger";
    })
  }

  selectPDF(){
    this.fileChooser.open().then(uri =>
      {(<any>window).FilePath.resolveNativePath(uri, (file) => {

        this.path = file;

        let extension = this.path.substr(this.path.lastIndexOf('.') + 1);

        if (extension == 'pdf'){

          let loaderPdf = this.loading.create({
            content: "Uploading PDF..."
          });

          loaderPdf.present();

          this.readFile();

          loaderPdf.dismiss();
          }
          else {
          this.message = "Seul un fichier Pdf est requis !";
        }
        })

      }).catch(e => this.message = 'Error - '+e);
  }

  readFile(){
    (<any>window).resolveLocalFileSystemURL(this.path, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();

        reader.onloadend = (evt: any) => {

          this.message = evt.target.result;
          //this.message = this.denonce.fichier;
        }
        reader.readAsDataURL(resFile);
      })
    })
  }

  getfilename(filestring){
    return filestring.replace(/^.*[\\\/]/, '');
  }

  goToHome(){
    this.navCtrl.setRoot(PopoverPage);
  }

  soumettre(){
    this.denonceService.soumettreDenonce(JSON.stringify(this.denonce)).subscribe(data=>{
      this.resultat = data;
      //this.navCtrl.push(SuiteDenonciationPage);
    },error=>{
      this.message = "Probléme de connexion !";
      console.error(error);
    });

    this.initialiser();
  }

  formDataToJSon(formData:any){
    var json = {};

    formData.forEach(function(valeur,cle){
      json[cle] = valeur;
    })
    return json;
  }

  initialiser(){
    this.denonce.acte = "";
    this.denonce.email = "";
    this.denonce.secteur = "";
    this.denonce.departement = "";
    this.denonce.region = "";
    this.denonce.message = "";
    this.denonce.photo = "";
    this.denonce.fichier = "";
    this.photos = [];
  }

}
