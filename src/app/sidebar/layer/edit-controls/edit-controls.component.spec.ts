import {EditControlsComponent} from './edit-controls.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(EditControlsComponent.name, () => {
  let component: EditControlsComponent;
  let fixture: MockedComponentFixture<EditControlsComponent>;

  beforeEach(() => {
    return MockBuilder(EditControlsComponent);
  });

  beforeEach(() => {
    fixture = MockRender(EditControlsComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
