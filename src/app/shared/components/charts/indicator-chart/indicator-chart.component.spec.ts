import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorChartComponent } from './indicator-chart.component';

describe('IndicatorChartComponent', () => {
  let component: IndicatorChartComponent;
  let fixture: ComponentFixture<IndicatorChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicatorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
