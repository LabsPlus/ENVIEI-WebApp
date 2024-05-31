import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailRecuperacaoModalComponent } from './change-email-recuperacao-modal.component';

describe('ChangeEmailRecuperacaoModalComponent', () => {
  let component: ChangeEmailRecuperacaoModalComponent;
  let fixture: ComponentFixture<ChangeEmailRecuperacaoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeEmailRecuperacaoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeEmailRecuperacaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
