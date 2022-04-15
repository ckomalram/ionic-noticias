import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;

  categories: string[]=[
    'business',
    'entertainment',
    'general',
    'health',
    'sciences',
    'sports',
    'technology'
  ];
  selectedCategory: string = this.categories[0];
  articles: Article[];

  constructor(private newsservice: NewsService) {}

  segmentChanged(event: any){
    this.articles=[];
    this.selectedCategory = event.detail.value;
    // console.log(category);
    this.newsservice.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe(articles => {
      this.articles = [...articles];
    });
  }

  ngOnInit(): void {
    this.articles=[];
    this.newsservice.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe(articles => {
      this.articles = [...articles];
    });
  }

  loadData(){
    this.newsservice.getTopHeadlinesByCategory(this.selectedCategory, true)
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
