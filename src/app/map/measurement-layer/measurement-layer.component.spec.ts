import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementLayerComponent } from './measurement-layer.component';

describe('MeasurementLayerComponent', () => {
  let component: MeasurementLayerComponent;
  let fixture: ComponentFixture<MeasurementLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
