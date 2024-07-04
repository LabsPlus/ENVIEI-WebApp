import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineShartComponent } from './line-shart.component';

describe('LineShartComponent', () => {
  let component: LineShartComponent;
  let fixture: ComponentFixture<LineShartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineShartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineShartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
