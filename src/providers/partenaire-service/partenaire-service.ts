import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PartenaireServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartenaireServiceProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello PartenaireServiceProvider Provider');
  }

  listePartenaire(){
    return this.http.get("http://senacte.com/stop-corruption/api/partenaire.php");
    //return this.http.get("http://localhost/stop-corruption/api/partenaire.php");
  }

}
