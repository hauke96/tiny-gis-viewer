import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerSidebarComponent} from './layer-sidebar.component';

describe('SidebarComponent', () => {
  let component: LayerSidebarComponent;
  let fixture: ComponentFixture<LayerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerSidebarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LayerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
