import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsService } from '../../../services';
import { Router } from '@angular/router';
import { isString } from 'util';
import { ArticleType } from '../../../interfaces';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit, DoCheck {
  public addNewsForm: FormGroup;
  public editorConfig: object = {
    uiColor: '#28b16d',
    toolbar: [
      { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
      { name: 'tools', items: ['Maximize'] },
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
      { name: 'styles', items: ['Styles', 'Format'] },
      { name: 'insert', items: ['sendButton'] }
    ]
  };
  public debounce: Number = 500;
  public isReady: Boolean = false;
  public articleTypes: ArticleType [] = [];
  public articleTypeId: number;

  constructor(private _fb: FormBuilder, private newsService: NewsService, private router: Router) {
    this.addNewsForm = this._fb.group({
      newsName: [undefined, [Validators.required]],
      articleType: [undefined, [Validators.required]],
      article: [undefined, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getArticleTypes();
    this.articleTypeId = 0;
    this.onArticleTypeChange(this.articleTypeId);
  }

  ngDoCheck() {
    this.onArticleTypeChange(this.articleTypeId);
  }

  onReady(event) {
    this.isReady = true;
  }

  onSubmit(formControlValues) {
    const params: object = {
      title: formControlValues.newsName,
      articleTypeId: formControlValues.articleType,
      description: formControlValues.article
    };
    this.newsService.addNews(params).subscribe(res => {
      this.router.navigate(['']);
    });
  }

  getArticleTypes() {
    this.newsService.getArticleTypes().subscribe(res => {
      this.articleTypes = res as ArticleType [];
    });
  }

  navigateToNewsSearch() {
    this.router.navigate(['']);
  }

  onArticleTypeChange(articleTypeId: any) {
    const externalObject: number = isString(articleTypeId) ? parseInt(articleTypeId, 10) : articleTypeId;
    if (!externalObject) {
      this.addNewsForm.controls['articleType'].setErrors({'incorrect': true});
    }
  }
}
