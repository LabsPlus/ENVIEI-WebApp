import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDoublePasswordComponent } from './input-double-password.component';

describe('InputDoublePasswordComponent', () => {
  let component: InputDoublePasswordComponent;
  let fixture: ComponentFixture<InputDoublePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDoublePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDoublePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
