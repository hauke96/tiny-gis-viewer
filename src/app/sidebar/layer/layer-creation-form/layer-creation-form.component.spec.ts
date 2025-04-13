import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerCreationFormComponent } from './layer-creation-form.component';

describe('WmsLayerCreationFormComponent', () => {
  let component: LayerCreationFormComponent;
  let fixture: ComponentFixture<LayerCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerCreationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
