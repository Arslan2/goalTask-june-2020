import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPreViewComponent } from './news-preview.component';

describe('NewsPreViewComponent', () => {
  let component: NewsPreViewComponent;
  let fixture: ComponentFixture<NewsPreViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPreViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
