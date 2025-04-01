import { ComponentFixture, TestBed } from '@angular/core/testing';

import {MeasureAreaLayerComponent} from './measure-area-layer.component';

describe(MeasureAreaLayerComponent.name, () => {
  let component: MeasureAreaLayerComponent;
  let fixture: ComponentFixture<MeasureAreaLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureAreaLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureAreaLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
