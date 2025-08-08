import {FeatureLayerComponent} from './feature-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(FeatureLayerComponent.name, () => {
  let component: FeatureLayerComponent;
  let fixture: MockedComponentFixture<FeatureLayerComponent>;

  beforeEach(() => {
    return MockBuilder(FeatureLayerComponent);
  });

  beforeEach(() => {
    fixture = MockRender(FeatureLayerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
