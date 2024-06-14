import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardApiKeysComponent } from './dashboard-api-keys.component';

describe('DashboardApiKeysComponent', () => {
  let component: DashboardApiKeysComponent;
  let fixture: ComponentFixture<DashboardApiKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardApiKeysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardApiKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
