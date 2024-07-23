import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStatComponent } from './form-stat.component';

describe('FormStatComponent', () => {
  let component: FormStatComponent;
  let fixture: ComponentFixture<FormStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
