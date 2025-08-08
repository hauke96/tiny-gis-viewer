import {MeasureAreaLayerComponent} from './measure-area-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(MeasureAreaLayerComponent.name, () => {
  let component: MeasureAreaLayerComponent;
  let fixture: MockedComponentFixture<MeasureAreaLayerComponent>;

  beforeEach(() => {
    return MockBuilder(MeasureAreaLayerComponent);
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
