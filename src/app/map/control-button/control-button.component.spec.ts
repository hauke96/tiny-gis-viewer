import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlButtonComponent } from './control-button.component';

describe('ControlButtonComponent', () => {
  let component: ControlButtonComponent;
  let fixture: ComponentFixture<ControlButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
