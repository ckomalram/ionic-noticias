import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/index';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage | null = null;
  private localArticles: Article[] = [];

  constructor(private storageService: Storage) {
    this.init();
  }

  get getLocalArticles(){
    return [ ...this.localArticles];
  }

  async init() {
    const storageIns = await this.storageService.create();
    this.storage = storageIns;
    this.loadFavorites();
  }

  async saveRemoveArticle(article: Article){
    const existeArticulo = this.localArticles.find( localArticle => localArticle.title === article.title );

    if (existeArticulo) {
      this.localArticles= this.localArticles.filter(la => la.title !== article.title);
    }else{
      this.localArticles = [article, ...this.localArticles];
    }
    this.storage.set('articles', this.localArticles);
  }

  async loadFavorites(){
    try {
      const articles = await this.storage.get('articles');
      this.localArticles = articles || [];
    } catch (error) {
      this.localArticles = [];
    }
  }

  articleInFavorite(article: Article){
    /** !! devuelve un valor booleano del valor */
    return !!this.localArticles.find(la => la.title === article.title);
  }

}
