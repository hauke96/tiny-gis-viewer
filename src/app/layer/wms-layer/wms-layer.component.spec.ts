import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsLayerComponent } from './wms-layer.component';

describe('WmsLayerComponent', () => {
  let component: WmsLayerComponent;
  let fixture: ComponentFixture<WmsLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WmsLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WmsLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
