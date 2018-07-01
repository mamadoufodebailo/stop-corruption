import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ActualiteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActualiteServiceProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello ActualiteServiceProvider Provider');
  }

  listeActualite(page,taille){
    return this.http.get("http://senacte.com/stop-corruption/api/actualite.php?page="+page+"&taille="+taille);
  }
}
