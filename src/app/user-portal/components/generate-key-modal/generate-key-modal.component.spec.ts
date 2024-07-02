import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateKeyModalComponent } from './generate-key-modal.component';

describe('GenerateKeyModalComponent', () => {
  let component: GenerateKeyModalComponent;
  let fixture: ComponentFixture<GenerateKeyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateKeyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateKeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
