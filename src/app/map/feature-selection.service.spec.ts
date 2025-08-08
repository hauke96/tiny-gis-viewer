import { TestBed } from '@angular/core/testing';

import { FeatureSelectionService } from './feature-selection.service';

describe(FeatureSelectionService.name, () => {
  let service: FeatureSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
