import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/primeng';
import { PAGINATION } from '../../../utils/defaults';
import { Router } from '@angular/router';
import { News, ArticleType } from '../../../interfaces';

@Component({
  selector: 'app-news-listing',
  templateUrl: './news-listing.component.html',
  styleUrls: ['./news-listing.component.css']
})
export class NewsListingComponent {
  public articleTypes: ArticleType [] = [];

  @Input() news: News = {};
  @Output() paginationEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteNewsEvent: EventEmitter<any> = new EventEmitter();
  public defaultLimit: number = PAGINATION.LIMIT;

  constructor(private router: Router) {}

  paginateList(event: LazyLoadEvent) {
    this.paginationEvent.emit({ page: (event.first + PAGINATION.LIMIT) / this.defaultLimit, limit: this.defaultLimit });
  }

  deleteNews(id: number) {
    this.deleteNewsEvent.emit(id);
  }

  previewNews(id: number, title: String) {
    this.router.navigate(['preview'], { queryParams: { newsId: id, newsTitle: title } });
  }
}
