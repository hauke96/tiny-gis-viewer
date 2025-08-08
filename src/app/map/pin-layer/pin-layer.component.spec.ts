import {PinLayerComponent} from './pin-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {MapService} from '../map.service';
import {of} from 'rxjs';

describe(PinLayerComponent.name, () => {
  let component: PinLayerComponent;
  let fixture: MockedComponentFixture<PinLayerComponent>;

  let mapService: MapService;

  beforeEach(() => {
    mapService = {
      clicked: of(),
      removeLayer: jest.fn(),
      addLayer: jest.fn(),
    } as never as MapService;

    return MockBuilder(PinLayerComponent)
      .provide({provide: MapService, useValue: mapService});
  });

  beforeEach(() => {
    fixture = MockRender(PinLayerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
