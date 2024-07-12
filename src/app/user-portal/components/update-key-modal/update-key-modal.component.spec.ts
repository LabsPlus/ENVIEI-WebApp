import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKeyModalComponent } from './update-key-modal.component';

describe('UpdateKeyModalComponent', () => {
  let component: UpdateKeyModalComponent;
  let fixture: ComponentFixture<UpdateKeyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateKeyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateKeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
