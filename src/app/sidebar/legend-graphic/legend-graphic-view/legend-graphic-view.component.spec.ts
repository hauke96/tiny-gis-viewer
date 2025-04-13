import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendGraphicViewComponent } from './legend-graphic-view.component';

describe('LegendGraphicViewComponent', () => {
  let component: LegendGraphicViewComponent;
  let fixture: ComponentFixture<LegendGraphicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendGraphicViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegendGraphicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
