import {InputTextComponent} from './input-text.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(InputTextComponent.name, () => {
  let component: InputTextComponent;
  let fixture: MockedComponentFixture<InputTextComponent>;

  beforeEach(() => {
    return MockBuilder(InputTextComponent);
  });

  beforeEach(() => {
    fixture = MockRender(InputTextComponent);
    component = fixture.point.componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
