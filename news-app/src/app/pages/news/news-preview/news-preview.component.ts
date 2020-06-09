import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../services';
import { PAGINATION } from '../../../utils/defaults';
import { first, get, isEmpty } from 'lodash';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewPreview } from '../../../interfaces';

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.css']
})
export class NewsPreViewComponent implements OnInit {
  public newsId: number;
  public news: NewPreview = {};
  public defaultLimit: number = PAGINATION.LIMIT;
  public defaultPage: number = PAGINATION.PAGE;
  public newsTitle: String = '';

  constructor(private route: ActivatedRoute, private newsService: NewsService, private sanitizer: DomSanitizer,
    private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['newsTitle'] && params['newsId']) {
        this.newsTitle = params['newsTitle'];
        this.getNews(params['newsId']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  getNews(newsId: number) {
    const params = { id: newsId };
    this.newsService.getNews(params).subscribe(res => {
      if (res['rows'].length) {
        this.news = first(res['rows']).NewsArticles;
      }
    });
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getModelHtml(newsData: object): SafeHtml {
    let dynamic_html: string;
    if (get(newsData, 'description')) {
      dynamic_html = newsData['description'];
    }
    return this.sanitize(dynamic_html);
  }

  navigateToNewsSearch() {
    this.router.navigate(['']);
  }

  isNewsPresent(newsObj: NewPreview): boolean {
    return isEmpty(newsObj) ? false : true;
  }
}
