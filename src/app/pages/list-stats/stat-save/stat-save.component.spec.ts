import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSaveComponent } from './stat-save.component';

describe('StatSaveComponent', () => {
  let component: StatSaveComponent;
  let fixture: ComponentFixture<StatSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
