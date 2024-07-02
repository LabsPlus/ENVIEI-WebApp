import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEyeButtonComponent } from './password-eye-button.component';

describe('PasswordEyeButtonComponent', () => {
  let component: PasswordEyeButtonComponent;
  let fixture: ComponentFixture<PasswordEyeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordEyeButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordEyeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
