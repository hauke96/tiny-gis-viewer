import {MapLayerComponent} from './map-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config/config.service';
import {FeatureSelectionService} from '../feature-selection.service';
import {MapService} from '../map.service';
import {Layer, XyzLayer} from '../layer';
import {LayerConfig} from '../../config/config';
import {of} from 'rxjs';

describe(MapLayerComponent.name, () => {
  let component: MapLayerComponent;
  let fixture: MockedComponentFixture<MapLayerComponent, any>;

  let mapService: MapService;
  let httpClient: HttpClient;
  let configService: ConfigService
  let featureSelectionService: FeatureSelectionService;

  let layer: Layer;

  beforeEach(() => {
    layer = new XyzLayer(
      new LayerConfig(
        'wms',
        "https://foo.com",
        "Title",
        "Name",
        true,
        "Attribution",
        true,
        undefined
      )
    );

    mapService = {
      removeLayer: jest.fn(),
      addLayer: jest.fn(),
      clicked: of(),
    } as never as MapService;
    configService = {} as never as ConfigService;
    httpClient = {} as never as HttpClient;
    featureSelectionService = {} as never as FeatureSelectionService;

    return MockBuilder(MapLayerComponent)
      .provide({provide: MapService, useValue: mapService})
      .provide({provide: HttpClient, useValue: httpClient})
      .provide({provide: ConfigService, useValue: configService})
      .provide({provide: FeatureSelectionService, useValue: featureSelectionService})
  });

  beforeEach(() => {
    fixture = MockRender(MapLayerComponent, {layer: layer});
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
