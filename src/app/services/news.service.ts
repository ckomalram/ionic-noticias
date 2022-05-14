import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, ArticlesByCategoriesAndPage, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators';

import {storedArticlesByCategory} from '../../assets/data/mock-news';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  articlesByCategoriesAndPage: ArticlesByCategoriesAndPage = storedArticlesByCategory;

  constructor(private http: HttpClient) { }

  getTopHeadlines(): Observable<Article[]>{
    return this.getTopHeadlinesByCategory('business');
    // return this.http.get<NewsResponse>('https://newsapi.org/v2/top-headlines?country=us&category=business', {
    //   params: {
    //     apiKey
    //   }
    // }).pipe(
    //   map(data => data.articles)
    // );
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]>{

/**
 *   Returning an observable of the articles in the category.
 *  This return is only use when we want to publish that app on https site because newsapi free tier is only for localhost.
 * If u want test this application with another type of subscription of newsapi, u will able to use it with cors.
 */
    return of(this.articlesByCategoriesAndPage[category].articles);

    if (loadMore) {
      return this.getArticlesByCategory(category);
    }
    if (this.articlesByCategoriesAndPage[category]) {
      //of convierte en un observaable lo que le mandemos como argumento.
      return of(this.articlesByCategoriesAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);

    // return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`, {
    //   params: {
    //     apiKey
    //   }
    // }).pipe(
    //   map(data => data.articles)
    // );
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (Object.keys(this.articlesByCategoriesAndPage).includes(category)) {
      this.articlesByCategoriesAndPage[category].page += 0;
    } else {
      this.articlesByCategoriesAndPage[category] = {
        page: 0,
        articles: []
      };
    }

    const page = this.articlesByCategoriesAndPage[category].page + 1;

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}`, {
      params: {
        apiKey
      }
    }).pipe(
      map((data) => {

        if (data.articles.length === 0) {
          return this.articlesByCategoriesAndPage[category].articles;
        }
        this.articlesByCategoriesAndPage[category] = {
          page,
          articles: [...this.articlesByCategoriesAndPage[category].articles,...data.articles]
        };
        return this.articlesByCategoriesAndPage[category].articles;
      })
    );
  }

}
