import {ControlPanelComponent} from './control-panel.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {MapService} from '../map.service';
import {of} from 'rxjs';

describe(ControlPanelComponent.name, () => {
  let component: ControlPanelComponent;
  let fixture: MockedComponentFixture<ControlPanelComponent>;

  let mapService: MapService;

  beforeEach(() => {
    mapService = {
      areaMeasurementStarted: of(),
      areaMeasurementEnded: of(),
      lengthMeasurementStarted: of(),
      lengthMeasurementEnded: of(),
    } as never as MapService;

    return MockBuilder(ControlPanelComponent)
      .provide({provide: MapService, useValue: mapService});
  });

  beforeEach(() => {
    fixture = MockRender(ControlPanelComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
