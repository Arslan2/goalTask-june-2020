import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [],
    children: [
      { path: '', loadChildren: 'app/pages/news/news.module#NewsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
