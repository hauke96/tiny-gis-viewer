import {LayerCreationFormComponent} from './layer-creation-form.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(LayerCreationFormComponent.name, () => {
  let component: LayerCreationFormComponent;
  let fixture: MockedComponentFixture<LayerCreationFormComponent>;

  beforeEach(() => {
    return MockBuilder(LayerCreationFormComponent);
  });

  beforeEach(() => {
    fixture = MockRender(LayerCreationFormComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
