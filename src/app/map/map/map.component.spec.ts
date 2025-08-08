import {MapComponent} from './map.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(MapComponent.name, () => {
  let component: MapComponent;
  let fixture: MockedComponentFixture<MapComponent>;

  beforeEach(() => {
    return MockBuilder(MapComponent);
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
