import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileModalComponent } from './delete-profile-modal.component';

describe('DeleteProfileModalComponent', () => {
  let component: DeleteProfileModalComponent;
  let fixture: ComponentFixture<DeleteProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProfileModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
