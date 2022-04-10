import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private newservice: NewsService) {}

  ngOnInit(): void {
    this.newservice.getTopHeadlines().subscribe(resp => {
      console.log(resp);
    });
  }
}
