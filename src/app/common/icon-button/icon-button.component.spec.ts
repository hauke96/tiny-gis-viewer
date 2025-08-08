import {IconButtonComponent} from './icon-button.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(IconButtonComponent.name, () => {
  let component: IconButtonComponent;
  let fixture: MockedComponentFixture<IconButtonComponent>;

  beforeEach(() => {
    return MockBuilder(IconButtonComponent);
  });

  beforeEach(() => {
    fixture = MockRender(IconButtonComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
