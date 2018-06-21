import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private baseApiPath = 'http://www.omdbapi.com/?apikey=';
  private apiKey = 'thewdb';
  public searchKey = 'my';

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1) {
    return this.http.get(`${this.baseApiPath}${this.apiKey}&s=${this.searchKey}&page=${page}`);
  }

  getMovieDetails(id) {
    return this.http.get(`${this.baseApiPath}${this.apiKey}&i=${id}&plot=full`);
  }

}
