import {PinLayerComponent} from './pin-layer.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(PinLayerComponent.name, () => {
  let component: PinLayerComponent;
  let fixture: MockedComponentFixture<PinLayerComponent>;

  beforeEach(() => {
    return MockBuilder(PinLayerComponent);
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
