import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { MovieProvider } from '../../providers/movie/movie';

import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
    likes: 12,
    comentarios: 4,
    data: '11h ago'
  }

  public listaFilmes = new Array<any>();
  public page = 1;
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.page = 1;

    this.carregarFilmes();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.imdbID });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FeedPage');

    this.carregarFilmes();
  }

  carregarFilmes(newpage: boolean = false) {
    this.presentLoading();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = JSON.parse((data as any)._body).Search;
        if (newpage) {
          this.listaFilmes = this.listaFilmes.concat(response);
          this.infiniteScroll.complete();
        } else {
          this.listaFilmes = response;
        }
        console.log(this.listaFilmes);

        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      error => {
        console.log(error);

        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      });
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave FeedPage');
    this.listaFilmes = new Array<any>();
    this.page = 1;
  }

}
