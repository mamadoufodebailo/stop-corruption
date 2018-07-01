import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DenoncerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DenoncerServiceProvider {

  constructor(public http: HttpClient) {

  }

  listeActe(){
    return this.http.get("http://senacte.com/stop-corruption/api/acte.php")
  }

  listeRegion(){
    return this.http.get("http://senacte.com/stop-corruption/api/region.php")
  }

  listeSecteur(){
    return this.http.get("http://senacte.com/stop-corruption/api/secteur.php")
  }

  listeVilleParRegion(region){
    return this.http.get("http://senacte.com/stop-corruption/api/ville.php?region="+region);
  }

  soumettreDenonce(data:any){
    return this.http.post("http://senacte.com/stop-corruption/api/denonce.php",data,{headers:new HttpHeaders("Content-Type:application/json")});
  }

}
