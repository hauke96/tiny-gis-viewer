import {FeatureDetailsComponent} from './feature-details.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(FeatureDetailsComponent.name, () => {
  let component: FeatureDetailsComponent;
  let fixture: MockedComponentFixture<FeatureDetailsComponent>;

  beforeEach(() => {
    return MockBuilder(FeatureDetailsComponent);
  });

  beforeEach(() => {
    fixture = MockRender(FeatureDetailsComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
