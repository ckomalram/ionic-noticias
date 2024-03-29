export interface NewsResponse {
  status:       string;
  totalResults: number;
  articles:     Article[];
}

export interface Article {
  source:      Source;
  author:      null | string;
  title:       string;
  description: null | string;
  url:         string;
  urlToImage:  null | string;
  publishedAt: string; /*with real newsapi use DATE ; with mocks usea string*/
  content:     null | string;
}

export interface Source {
  id:   null | string;
  name: string;
}

export interface ArticlesByCategoriesAndPage{
  [key: string]: {
    page: number;
    articles: Article[];
  };
}
