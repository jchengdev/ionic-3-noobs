import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/*
  Generated class for the CartolaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartolaProvider {

  public basepath = '/cartolaapi';

  constructor(
    public http: Http,
    private _platform: Platform
  ) {
    if (this._platform.is('cordova')) {
      this.basepath = 'https://api.cartolafc.globo.com'; //MOBILE W/OUT CORS
    }
  }

  atletas() {
    return this.http.get(`${this.basepath}/atletas/mercado`);
  }
}
