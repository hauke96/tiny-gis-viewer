import {LanguageSelectionComponent} from './language-selection.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {TranslateService} from '@ngx-translate/core';

describe(LanguageSelectionComponent.name, () => {
  let component: LanguageSelectionComponent;
  let fixture: MockedComponentFixture<LanguageSelectionComponent>;

  let translateService: TranslateService;

  beforeEach(() => {
    translateService = {
      langs: [],
    } as never as TranslateService;

    return MockBuilder(LanguageSelectionComponent)
      .provide({provide: TranslateService, useValue: translateService});
  });

  beforeEach(() => {
    fixture = MockRender(LanguageSelectionComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
