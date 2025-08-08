import {FeatureSelectionMenuComponent} from './feature-selection-menu.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(FeatureSelectionMenuComponent.name, () => {
  let component: FeatureSelectionMenuComponent;
  let fixture: MockedComponentFixture<FeatureSelectionMenuComponent>;

  beforeEach(() => {
    return MockBuilder(FeatureSelectionMenuComponent);
  });

  beforeEach(() => {
    fixture = MockRender(FeatureSelectionMenuComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
