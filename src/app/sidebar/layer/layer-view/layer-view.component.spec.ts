import {LayerViewComponent} from './layer-view.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(LayerViewComponent.name, () => {
  let component: LayerViewComponent;
  let fixture: MockedComponentFixture<LayerViewComponent>;

  beforeEach(() => {
    return MockBuilder(LayerViewComponent);
  });

  beforeEach(() => {
    fixture = MockRender(LayerViewComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
