import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSectionHomePageComponent } from './first-section-home-page.component';

describe('FirstSectionHomePageComponent', () => {
  let component: FirstSectionHomePageComponent;
  let fixture: ComponentFixture<FirstSectionHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstSectionHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstSectionHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
