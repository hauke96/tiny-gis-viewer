import {DialogComponent} from './dialog.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(DialogComponent.name, () => {
  let component: DialogComponent;
  let fixture: MockedComponentFixture<DialogComponent>;

  beforeEach(() => {
    return MockBuilder(DialogComponent);
  });

  beforeEach(() => {
    fixture = MockRender(DialogComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
