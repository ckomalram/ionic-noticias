import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

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

}
