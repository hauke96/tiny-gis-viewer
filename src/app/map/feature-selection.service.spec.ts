import {FeatureSelectionService} from './feature-selection.service';
import {ActivatedRoute, Router} from '@angular/router';

describe(FeatureSelectionService.name, () => {
  let service: FeatureSelectionService;

  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    router = {} as never as Router;
    activatedRoute = {} as never as ActivatedRoute;

    service = new FeatureSelectionService(router, activatedRoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
