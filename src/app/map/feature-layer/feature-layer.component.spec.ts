import {FeatureLayerComponent} from './feature-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {MapService} from '../map.service';
import {FeatureSelectionService} from '../feature-selection.service';
import {of} from 'rxjs';

describe(FeatureLayerComponent.name, () => {
  let component: FeatureLayerComponent;
  let fixture: MockedComponentFixture<FeatureLayerComponent>;

  let mapService: MapService;
  let featureSelectionService: FeatureSelectionService;

  beforeEach(() => {
    mapService = {
      removeLayer: jest.fn(),
      addLayer: jest.fn(),
    } as never as MapService;
    featureSelectionService = {
      focussedFeature: of(),
    } as never as FeatureSelectionService;

    return MockBuilder(FeatureLayerComponent)
      .provide({provide: MapService, useValue: mapService})
      .provide({provide: FeatureSelectionService, useValue: featureSelectionService})
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
