import {IconTextButtonComponent} from './icon-text-button.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(IconTextButtonComponent.name, () => {
  let component: IconTextButtonComponent;
  let fixture: MockedComponentFixture<IconTextButtonComponent>;

  beforeEach(() => {
    return MockBuilder(IconTextButtonComponent);
  });

  beforeEach(() => {
    fixture = MockRender(IconTextButtonComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
