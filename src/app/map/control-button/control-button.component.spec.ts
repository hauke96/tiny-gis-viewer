import {ControlButtonComponent} from './control-button.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(ControlButtonComponent.name, () => {
  let component: ControlButtonComponent;
  let fixture: MockedComponentFixture<ControlButtonComponent>;

  beforeEach(() => {
    return MockBuilder(ControlButtonComponent);
  });

  beforeEach(() => {
    fixture = MockRender(ControlButtonComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
