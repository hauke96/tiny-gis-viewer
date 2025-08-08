import {FeatureSelectionMenuComponent} from './feature-selection-menu.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Feature} from 'ol';
import {Layer} from '../../../map/layer';

describe(FeatureSelectionMenuComponent.name, () => {
  let component: FeatureSelectionMenuComponent;
  let fixture: MockedComponentFixture<FeatureSelectionMenuComponent, any>;

  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    activatedRoute = {
      queryParamMap: of()
    } as never as ActivatedRoute;

    return MockBuilder(FeatureSelectionMenuComponent)
      .provide({provide: ActivatedRoute, useValue: activatedRoute});
  });

  beforeEach(() => {
    fixture = MockRender(FeatureSelectionMenuComponent, {features: new Map<Layer, Feature[]>()});
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
