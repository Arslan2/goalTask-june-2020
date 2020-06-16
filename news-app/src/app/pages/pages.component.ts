import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../../environments/environment';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-pages',
  template: '<router-outlet></router-outlet>'
})

export class PagesComponent {

  constructor(private pubnubService: PubNubAngular, private flashMessagesService: FlashMessagesService) {
    this.pubnubService.init({
      publishKey: environment.pubnubPublishKey,
      subscribeKey: environment.pubnubSubscribeKey
    });
    this.pubnubService.subscribe({
      channels: ['news-system-success','news-system-error'],
      withPresence: true,
      triggerEvents: ['message']
    });
    this.pubnubService.addListener({
      message: (notification) => {
        let cssClassName = 'alert-success'
        if (notification.subscribedChannel === 'news-system-error') {
          cssClassName = 'alert-error'
        }
        this.flashMessagesService.show(notification.message, { cssClass: cssClassName, timeout: 2000 });
      }
    });
  }
}
