import {LayerListComponent} from './layer-list.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(LayerListComponent.name, () => {
  let component: LayerListComponent;
  let fixture: MockedComponentFixture<LayerListComponent>;

  beforeEach(() => {
    return MockBuilder(LayerListComponent);
  });

  beforeEach(() => {
    fixture = MockRender(LayerListComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
