import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditControlsComponent } from './edit-controls.component';

describe('EditControlsComponent', () => {
  let component: EditControlsComponent;
  let fixture: ComponentFixture<EditControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
