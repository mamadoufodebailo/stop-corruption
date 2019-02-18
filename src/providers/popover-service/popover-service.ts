import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PopoverServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PopoverServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PopoverServiceProvider Provider');
  }

  getSlides(){
    return this.http.get("http://senacte.com/stop-corruption/api/slide.php");
  }

}
