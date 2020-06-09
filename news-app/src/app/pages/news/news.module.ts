import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './news.component';
import { routing } from './news.routing';
import { NewsListingComponent } from './news-listing/news-listing.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsPreViewComponent } from './news-preview/news-preview.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { DataTableModule } from 'primeng/primeng';
import { NewsService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    DataTableModule,
    CKEditorModule
  ],
  declarations: [
    NewsComponent,
    AddNewsComponent,
    NewsListingComponent,
    NewsPreViewComponent
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }
