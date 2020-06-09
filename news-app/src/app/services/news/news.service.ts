import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { News, ArticleType } from '../../interfaces';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(params = null): Observable <News> {
    return this.http.get('/api/news', {...httpOptions, params: params});
  }

  getArticleTypes(): Observable <ArticleType> {
    return this.http.get('/api/news/types', httpOptions);
  }

  addNews(params: object): Observable<Object> {
    return this.http.post('/api/news', params, httpOptions);
  }

  deleteNews(id: number): Observable <Object> {
    return this.http.delete(`/api/news/${id}`, httpOptions);
  }
}
