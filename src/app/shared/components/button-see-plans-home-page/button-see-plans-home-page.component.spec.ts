import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSeePlansHomePageComponent } from './button-see-plans-home-page.component';

describe('ButtonSeePlansHomePageComponent', () => {
  let component: ButtonSeePlansHomePageComponent;
  let fixture: ComponentFixture<ButtonSeePlansHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSeePlansHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSeePlansHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
