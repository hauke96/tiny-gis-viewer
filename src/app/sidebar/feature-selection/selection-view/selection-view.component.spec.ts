import {SelectionViewComponent} from './selection-view.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {MapService} from '../../../map/map.service';
import {FeatureSelectionService} from '../../../map/feature-selection.service';
import {of} from 'rxjs';

describe(SelectionViewComponent.name, () => {
  let component: SelectionViewComponent;
  let fixture: MockedComponentFixture<SelectionViewComponent>;

  let mapService: MapService;
  let featureSelectionService: FeatureSelectionService;

  beforeEach(() => {
    mapService = {} as never as MapService;
    featureSelectionService = {
      selectionOnMap: of(),
      deselectAllFeaturesOnMap: jest.fn(),
      unfocusFeature: jest.fn(),
    } as never as FeatureSelectionService;

    return MockBuilder(SelectionViewComponent)
      .provide({provide: MapService, useValue: mapService})
      .provide({provide: FeatureSelectionService, useValue: featureSelectionService})
  });

  beforeEach(() => {
    fixture = MockRender(SelectionViewComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
