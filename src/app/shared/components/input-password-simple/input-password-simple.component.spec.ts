import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordSimpleComponent } from './input-password-simple.component';

describe('InputPasswordSimpleComponent', () => {
  let component: InputPasswordSimpleComponent;
  let fixture: ComponentFixture<InputPasswordSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPasswordSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
