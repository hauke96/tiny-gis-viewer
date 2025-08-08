import {MapLayerComponent} from './map-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(MapLayerComponent.name, () => {
  let component: MapLayerComponent;
  let fixture: MockedComponentFixture<MapLayerComponent>;

  beforeEach(() => {
    return MockBuilder(MapLayerComponent);
  });

  beforeEach(() => {
    fixture = MockRender(MapLayerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
