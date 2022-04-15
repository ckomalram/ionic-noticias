import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll,{static: true}) ionInfiniteScroll: IonInfiniteScroll;


  articles: Article[];

  constructor(private newservice: NewsService) {}

  ngOnInit(): void {
    this.articles = [];
    this.newservice.getTopHeadlines().subscribe(articles => {
      // console.log(resp);
      this.articles.push(...articles);
    });
  }

  loadData(){
    this.newservice.getTopHeadlinesByCategory('business', true)
    .subscribe(articles => {

      if (articles.length === this.articles.length) {
        this.ionInfiniteScroll.disabled = true;
        // event.target.disabled = true;
        return;
      }
      this.articles = articles;
      this.ionInfiniteScroll.complete();
      // setTimeout(() => {
      //   event.target.complete();
      // }, 1000);
    });
  }
}
