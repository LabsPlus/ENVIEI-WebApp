import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSeePlansHomePageclsComponent } from './button-see-plans-home-pagecls.component';

describe('ButtonSeePlansHomePageclsComponent', () => {
  let component: ButtonSeePlansHomePageclsComponent;
  let fixture: ComponentFixture<ButtonSeePlansHomePageclsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSeePlansHomePageclsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSeePlansHomePageclsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
