import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordScreenComponent } from './new-password-screen.component';

describe('NewPasswordScreenComponent', () => {
  let component: NewPasswordScreenComponent;
  let fixture: ComponentFixture<NewPasswordScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPasswordScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPasswordScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
