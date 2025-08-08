import {DropDownComponent} from './drop-down.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(DropDownComponent.name, () => {
  let component: DropDownComponent;
  let fixture: MockedComponentFixture<DropDownComponent>;

  beforeEach(() => {
    return MockBuilder(DropDownComponent);
  });

  beforeEach(() => {
    fixture = MockRender(DropDownComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
