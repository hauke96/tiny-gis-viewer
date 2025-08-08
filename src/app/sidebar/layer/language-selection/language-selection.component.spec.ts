import {LanguageSelectionComponent} from './language-selection.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(LanguageSelectionComponent.name, () => {
  let component: LanguageSelectionComponent;
  let fixture: MockedComponentFixture<LanguageSelectionComponent>;

  beforeEach(() => {
    return MockBuilder(LanguageSelectionComponent);
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
