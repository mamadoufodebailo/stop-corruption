import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ContactServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactServiceProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello ContactServiceProvider Provider');
  }


  ajouterMessage(data:any){
    return this.http.post("http://senacte.com/stop-corruption/api/contact.php",data,
      {headers:new HttpHeaders("Content-Type:application/json")} );
  }

}
