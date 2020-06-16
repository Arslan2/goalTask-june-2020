import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { PubNubAngular } from 'pubnub-angular2';
import { FlashMessagesService } from 'angular2-flash-messages';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [PagesComponent],
  providers: [
    PubNubAngular,
    FlashMessagesService
  ]
})
export class PagesModule {
}
