import {ControlPanelComponent} from './control-panel.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(ControlPanelComponent.name, () => {
  let component: ControlPanelComponent;
  let fixture: MockedComponentFixture<ControlPanelComponent>;

  beforeEach(() => {
    return MockBuilder(ControlPanelComponent);
  });

  beforeEach(() => {
    fixture = MockRender(ControlPanelComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
