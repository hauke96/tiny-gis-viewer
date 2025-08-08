import {MeasureAreaLayerComponent} from './measure-area-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {MapService} from '../map.service';
import {of} from 'rxjs';

describe(MeasureAreaLayerComponent.name, () => {
  let component: MeasureAreaLayerComponent;
  let fixture: MockedComponentFixture<MeasureAreaLayerComponent>;

  let mapService: MapService;

  beforeEach(() => {
    mapService = {
      areaMeasurementStarted: of(),
      areaMeasurementEnded: of(),
      addInteraction: jest.fn(),
      removeInteraction: jest.fn(),
      addLayer: jest.fn(),
      removeLayer: jest.fn(),
    } as never as MapService;

    return MockBuilder(MeasureAreaLayerComponent)
      .provide({provide: MapService, useValue: mapService});
  });

  beforeEach(() => {
    fixture = MockRender(MeasureAreaLayerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
