import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-language-selection',
  imports: [
    NgForOf
  ],
  templateUrl: './language-selection.component.html',
  styleUrl: './language-selection.component.scss'
})
export class LanguageSelectionComponent {
  constructor(private translate: TranslateService) {
  }

  public get allLanguages(): string[] {
    let languages = this.translate.langs;
    languages.sort();
    return languages;
  }

  public isCurrentLanguage(language: string): boolean {
    return this.translate.currentLang === language
  }

  public onClick(language: string) {
    this.translate.use(language);
  }
}
