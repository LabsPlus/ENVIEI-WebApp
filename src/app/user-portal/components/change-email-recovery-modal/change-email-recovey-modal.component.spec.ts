import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailRecoveryModalComponent } from './change-email-recovery-modal.component';
describe('ChangeEmailRecoveryModalComponent', () => {
  let component:ChangeEmailRecoveryModalComponent;
  let fixture: ComponentFixture<ChangeEmailRecoveryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeEmailRecoveryModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeEmailRecoveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
