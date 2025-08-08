import {MapComponent} from './map.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {MapService} from '../map.service';
import {FeatureSelectionService} from '../feature-selection.service';
import {of} from 'rxjs';
import {LayerService} from '../layer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../config/config.service';

describe(MapComponent.name, () => {
  let component: MapComponent;
  let fixture: MockedComponentFixture<MapComponent>;

  let mapService: MapService;
  let layerService: LayerService;
  let featureSelectionService: FeatureSelectionService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let configService: ConfigService;

  beforeEach(() => {
    mapService = {
      changeProjection: jest.fn(),
      changeResolution: jest.fn(),
      layerAdded: of(),
      layerRemoved: of(),
      interactionAdded: of(),
      interactionRemoved: of(),
      zoomedIn: of(),
      zoomedOut: of(),
    } as never as MapService;
    layerService = {
      layers: of(),
    } as never as LayerService;
    featureSelectionService = {
      focussedFeature: of(),
    } as never as FeatureSelectionService;
    router = {
      events: of()
    } as never as Router;
    activatedRoute = {} as never as ActivatedRoute;
    configService = {
      config: of()
    } as never as ConfigService;

    return MockBuilder(MapComponent)
      .provide({provide: MapService, useValue: mapService})
      .provide({provide: LayerService, useValue: layerService})
      .provide({provide: FeatureSelectionService, useValue: featureSelectionService})
      .provide({provide: Router, useValue: router})
      .provide({provide: ActivatedRoute, useValue: activatedRoute})
      .provide({provide: ConfigService, useValue: configService});
  });

  beforeEach(() => {
    fixture = MockRender(MapComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
