import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {

  constructor(public http: HttpClient) {

  }

  listeInformation(page,taille){
    return this.http.get("http://senacte.com/stop-corruption/api/information.php?page="+page+"&taille="+taille);
    //return this.http.get("http://localhost/stop-corruption/api/information.php?page="+page+"&taille="+taille);
  }

}
