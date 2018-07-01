import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DenoncerServiceProvider } from '../../providers/denoncer-service/denoncer-service';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Transfer} from "@ionic-native/transfer";
import {File, FileEntry} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser";

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
  fGroup: FormGroup;
  departements: any;
  formulaire : FormData = new FormData();
  actes : any;
  regions : any;
  secteurs: any;
  photo: string;

    categorie: any;
    message: any;
    region: any;
    departement:any;
    periode:any;
    duree:any;
    email:any;
    secteur:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder,public denonceService:DenoncerServiceProvider,public alert:AlertController
              ,public camera:Camera,public transfer:Transfer,public file:File,public alertCtrl: AlertController,public loadCtrl:LoadingController,public fileChooser:FileChooser) {
    this.fGroup = fb.group({categorie:['',Validators.required],
      message:['',Validators.required],duree:['',''],
      periode:['',''],email:['',''], region:['',Validators.required],
      departement:['',Validators.required],secteur:['',Validators.required]});

    this.categorie = this.fGroup.controls['categorie'];
    this.message = this.fGroup.controls['message'];
    this.region = this.fGroup.controls['region'];
    this.departement = this.fGroup.controls['departement'];
    this.periode = this.fGroup.controls['periode'];
    this.duree = this.fGroup.controls['duree'];
    this.email = this.fGroup.controls['email'];
    this.secteur = this.fGroup.controls['secteur'];

    this.initialiser();
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
    this.fGroup.get("region").valueChanges.subscribe(data => {
      this.denonceService.listeVilleParRegion(data).subscribe(data=>{
        this.departements = data;
        document.getElementById("ville").style.display = "block";
      },error=>{
        console.error(error);
      });
    })

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
      this.photo = 'data:image/png;base64,'+data;
      this.formulaire.append("photo",this.photo);
    }).catch(error=>{
      console.error(error);
    });
  }

  takeFile(){
    this.fileChooser.open().then(uri=>{
        this.uploadFile(uri);
    })
  }

  /*private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + Math.floor(Math.random()) + ".pdf";
    return newFileName;
  }*/

  readFile(file:any){
    let reader = new FileReader();
    reader.onloadend = () =>{
      const imgBlod = new Blob([reader.result],{type:file.type});
      this.formulaire.append('fichier',imgBlod,file.name);
    }
    reader.readAsArrayBuffer(file);
  }

  uploadFile(fileUri:any){
    let loading = this.loadCtrl.create({
      content: "Téléchargement de fichier..."
    })

    loading.present();

    this.file.resolveLocalFilesystemUrl(fileUri).then(
      entry =>(<FileEntry>entry).file(file=>this.readFile(file)))
      .catch(error=>console.error(error));

    loading.dismiss();
  }

  soumettre(){
    this.formulaire.append("acte",this.fGroup.controls["categorie"].value);
    this.formulaire.append("message",this.fGroup.controls["message"].value);
    this.formulaire.append("region",this.fGroup.controls["region"].value);
    this.formulaire.append("departement",this.fGroup.controls["departement"].value);
    this.formulaire.append("secteur",this.fGroup.controls["secteur"].value);
    this.formulaire.append("periode",this.fGroup.controls["periode"].value);
    this.formulaire.append("duree",this.fGroup.controls["duree"].value);
    this.formulaire.append("email",this.fGroup.controls["email"].value);

    //console.log(JSON.stringify(this.formDataToJSon(this.formulaire)));

    this.denonceService.soumettreDenonce(JSON.stringify(this.formDataToJSon(this.formulaire))).subscribe(data=>{
      console.log(data);
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
    this.fGroup.get("categorie").setValue("");
    this.fGroup.get("message").setValue("");
    this.fGroup.get("email").setValue("");
    this.fGroup.get("region").setValue("");
    this.fGroup.get("secteur").setValue("");
  }

}
