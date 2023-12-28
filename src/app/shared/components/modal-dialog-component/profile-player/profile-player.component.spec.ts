import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePlayerComponent } from './profile-player.component';

describe('ProfilePlayerComponent', () => {
  let component: ProfilePlayerComponent;
  let fixture: ComponentFixture<ProfilePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
