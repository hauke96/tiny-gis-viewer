import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureLengthLayerComponent } from './measure-length-layer.component';

describe(MeasureLengthLayerComponent.name, () => {
  let component: MeasureLengthLayerComponent;
  let fixture: ComponentFixture<MeasureLengthLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureLengthLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureLengthLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
