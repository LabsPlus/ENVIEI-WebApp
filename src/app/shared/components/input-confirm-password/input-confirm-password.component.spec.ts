import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputConfirmPasswordComponent } from './input-confirm-password.component';

describe('InputConfirmPasswordComponent', () => {
  let component: InputConfirmPasswordComponent;
  let fixture: ComponentFixture<InputConfirmPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputConfirmPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputConfirmPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
