import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSelectionMenuComponent } from './feature-selection-menu.component';

describe('FeatureSelectionMenuComponent', () => {
  let component: FeatureSelectionMenuComponent;
  let fixture: ComponentFixture<FeatureSelectionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureSelectionMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureSelectionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
