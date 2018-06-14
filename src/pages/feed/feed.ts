import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public objeto_feed: object = {
    titulo: 'O Aventureiro',
    data_usuario: 'November 5, 1955',
    descricao: 'App incrível',
    likes: 12,
    comentarios: 4,
    data: '11h ago'
  }

  public listaFilmes = new Array<any>();
  //public nomeUsuario: string = 'O Aventureiro';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider
  ) {
  }

  // public somaDoisNumeros(num1: number, num2: number): void {
  //   alert('minha função funciona: ' + (num1 + num2));
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    // this.somaDoisNumeros(1,2);
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        this.listaFilmes = JSON.parse((data as any)._body).Search;
        console.log(this.listaFilmes);
      }, 
      error => {
        console.log(error);
      });
  }

}
