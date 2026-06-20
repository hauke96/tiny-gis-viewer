import {Component, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-language-selection',
  imports: [],
  templateUrl: './language-selection.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './language-selection.component.scss'
})
export class LanguageSelectionComponent {
  constructor(private translate: TranslateService) {
  }

  protected get allLanguages(): string[] {
    let languages = [...this.translate.getLangs()];
    languages.sort();
    return languages;
  }

  protected isCurrentLanguage(language: string): boolean {
    return this.translate.currentLang === language
  }

  protected onClick(language: string) {
    this.translate.use(language);
  }
}
