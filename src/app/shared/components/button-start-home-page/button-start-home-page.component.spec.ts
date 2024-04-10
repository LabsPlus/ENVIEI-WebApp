import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStartHomePageComponent } from './button-start-home-page.component';

describe('ButtonStartHomePageComponent', () => {
  let component: ButtonStartHomePageComponent;
  let fixture: ComponentFixture<ButtonStartHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonStartHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonStartHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
