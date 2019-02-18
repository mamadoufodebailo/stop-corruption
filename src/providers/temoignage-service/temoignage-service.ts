import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TemoignageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemoignageServiceProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello TemoignageServiceProvider Provider');
  }

  listeTemoignage(page,taille){
    return this.http.get("http://senacte.com/stop-corruption/api/temoignage.php?page="+page+"&taille="+taille);
    //return this.http.get("http://localhost/stop-corruption/api/temoignage.php?page="+page+"&taille="+taille);
  }

}
