import {CheckboxComponent} from './checkbox.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(CheckboxComponent.name, () => {
  let component: CheckboxComponent;
  let fixture: MockedComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    return MockBuilder(CheckboxComponent);
  });

  beforeEach(() => {
    fixture = MockRender(CheckboxComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
