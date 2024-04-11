import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSectionHomePageComponent } from './dev-section-home-page.component';

describe('DevSectionHomePageComponent', () => {
  let component: DevSectionHomePageComponent;
  let fixture: ComponentFixture<DevSectionHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevSectionHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevSectionHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
