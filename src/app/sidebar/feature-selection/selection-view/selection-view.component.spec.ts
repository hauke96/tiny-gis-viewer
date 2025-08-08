import {SelectionViewComponent} from './selection-view.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(SelectionViewComponent.name, () => {
  let component: SelectionViewComponent;
  let fixture: MockedComponentFixture<SelectionViewComponent>;

  beforeEach(() => {
    return MockBuilder(SelectionViewComponent);
  });

  beforeEach(() => {
    fixture = MockRender(SelectionViewComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
