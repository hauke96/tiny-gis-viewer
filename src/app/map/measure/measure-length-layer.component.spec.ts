import {MeasureLengthLayerComponent} from './measure-length-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {MapService} from '../map.service';
import {of} from 'rxjs';

describe(MeasureLengthLayerComponent.name, () => {
  let component: MeasureLengthLayerComponent;
  let fixture: MockedComponentFixture<MeasureLengthLayerComponent>;

  let mapService: MapService;

  beforeEach(() => {
    mapService = {
      lengthMeasurementStarted: of(),
      lengthMeasurementEnded: of(),
      addInteraction: jest.fn(),
      removeInteraction: jest.fn(),
      addLayer: jest.fn(),
      removeLayer: jest.fn(),
    } as never as MapService;

    return MockBuilder(MeasureLengthLayerComponent)
      .provide({provide: MapService, useValue: mapService});
  });

  beforeEach(() => {
    fixture = MockRender(MeasureLengthLayerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
