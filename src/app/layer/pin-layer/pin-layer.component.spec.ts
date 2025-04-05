import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinLayerComponent } from './pin-layer.component';

describe('PinLayerComponent', () => {
  let component: PinLayerComponent;
  let fixture: ComponentFixture<PinLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
