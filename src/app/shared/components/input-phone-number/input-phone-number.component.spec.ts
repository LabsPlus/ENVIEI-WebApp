import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPhoneNumberComponent } from './input-phone-number.component';

describe('InputPhoneNumberComponent', () => {
  let component: InputPhoneNumberComponent;
  let fixture: ComponentFixture<InputPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPhoneNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
