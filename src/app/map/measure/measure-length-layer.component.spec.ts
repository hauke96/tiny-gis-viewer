import {MeasureLengthLayerComponent} from './measure-length-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(MeasureLengthLayerComponent.name, () => {
  let component: MeasureLengthLayerComponent;
  let fixture: MockedComponentFixture<MeasureLengthLayerComponent>;

  beforeEach(() => {
    return MockBuilder(MeasureLengthLayerComponent);
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
