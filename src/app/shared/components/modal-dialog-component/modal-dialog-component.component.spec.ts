import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogComponentComponent } from './modal-dialog-component.component';

describe('ModalDialogComponentComponent', () => {
  let component: ModalDialogComponentComponent;
  let fixture: ComponentFixture<ModalDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
