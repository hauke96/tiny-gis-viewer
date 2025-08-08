import {LegendGraphicViewComponent} from './legend-graphic-view.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {LayerService} from '../../../map/layer.service';
import {of} from 'rxjs';

describe(LegendGraphicViewComponent.name, () => {
  let component: LegendGraphicViewComponent;
  let fixture: MockedComponentFixture<LegendGraphicViewComponent>;

  let layerService: LayerService;

  beforeEach(() => {
    layerService = {
      layers: of(),
    } as never as LayerService;

    return MockBuilder(LegendGraphicViewComponent)
      .provide({provide: LayerService, useValue: layerService});
  });

  beforeEach(() => {
    fixture = MockRender(LegendGraphicViewComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
