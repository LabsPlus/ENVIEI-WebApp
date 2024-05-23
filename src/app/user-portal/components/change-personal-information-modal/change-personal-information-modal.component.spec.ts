import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePersonalInformationModalComponent } from './change-personal-information-modal.component';

describe('ChangePersonalInformationModalComponent', () => {
  let component: ChangePersonalInformationModalComponent;
  let fixture: ComponentFixture<ChangePersonalInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePersonalInformationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePersonalInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
