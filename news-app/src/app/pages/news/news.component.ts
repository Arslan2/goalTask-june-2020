import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services';
import { PAGINATION } from '../../utils/defaults';
import { Router } from '@angular/router';
import { isString } from 'util';
import { News, ArticleType } from '../../interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public news: News = {};
  public articleTypes: ArticleType [] = [];
  public articleTypeId: number;
  public defaultLimit: number = PAGINATION.LIMIT;
  public defaultPage: number = PAGINATION.PAGE;

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.getNews({page: this.defaultPage, limit: this.defaultLimit});
    this.getArticleTypes();
    this.articleTypeId = 0;
  }

  getNews(params: object): void {
    this.newsService.getNews(params).subscribe(res => {
      this.news = res;
    });
  }

  addNews(): void {
    this.router.navigate(['add']);
  }

  getArticleTypes(): void{
    this.newsService.getArticleTypes().subscribe(res => {
      this.articleTypes = res as ArticleType [];
    });
  }

  deleteNews(newsId: number): void{
    this.newsService.deleteNews(newsId).subscribe(res => {
      if (res['deleted']) {
        this.getNews({page: this.defaultPage, limit: this.defaultLimit});
      }
    });
  }

  onArticleTypeChange(articleTypeId: any): void {
    const externalObject: number = isString(articleTypeId) ? parseInt(articleTypeId, 10) : articleTypeId;
    const params: object = {
      page: this.defaultPage,
      limit: this.defaultLimit
    };
    if (externalObject) {
      params['articleTypeId'] = externalObject;
    }

    this.newsService.getNews(params).subscribe(res => {
      this.news = res;
    });
  }
}
