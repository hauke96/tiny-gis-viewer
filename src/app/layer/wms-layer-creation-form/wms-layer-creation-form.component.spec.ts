import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsLayerCreationFormComponent } from './wms-layer-creation-form.component';

describe('WmsLayerCreationFormComponent', () => {
  let component: WmsLayerCreationFormComponent;
  let fixture: ComponentFixture<WmsLayerCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WmsLayerCreationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WmsLayerCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
