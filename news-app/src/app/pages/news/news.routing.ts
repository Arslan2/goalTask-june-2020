import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NewsComponent } from './news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsPreViewComponent } from './news-preview/news-preview.component';


export const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: 'add',
    component: AddNewsComponent,
  },
  {
    path: 'preview',
    component: NewsPreViewComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
