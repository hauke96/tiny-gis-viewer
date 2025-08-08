import {LegendGraphicViewComponent} from './legend-graphic-view.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe(LegendGraphicViewComponent.name, () => {
  let component: LegendGraphicViewComponent;
  let fixture: MockedComponentFixture<LegendGraphicViewComponent>;

  beforeEach(() => {
    return MockBuilder(LegendGraphicViewComponent);
  });

  beforeEach(() => {
    fixture = MockRender(LegendGraphicViewComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
