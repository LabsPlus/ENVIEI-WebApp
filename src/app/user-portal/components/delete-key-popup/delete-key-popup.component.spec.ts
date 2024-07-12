import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKeyPopupComponent } from './delete-key-popup.component';

describe('DeleteKeyPopupComponent', () => {
  let component: DeleteKeyPopupComponent;
  let fixture: ComponentFixture<DeleteKeyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteKeyPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteKeyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
