import {LayerListItemComponent} from './layer-list-item.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(LayerListItemComponent.name, () => {
  let component: LayerListItemComponent;
  let fixture: MockedComponentFixture<LayerListItemComponent>;

  beforeEach(() => {
    return MockBuilder(LayerListItemComponent);
  });

  beforeEach(() => {
    fixture = MockRender(LayerListItemComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
