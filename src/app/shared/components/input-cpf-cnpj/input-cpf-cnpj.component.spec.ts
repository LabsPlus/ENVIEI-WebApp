import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCpfCnpjComponent } from './input-cpf-cnpj.component';

describe('InputCpfCnpjComponent', () => {
  let component: InputCpfCnpjComponent;
  let fixture: ComponentFixture<InputCpfCnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCpfCnpjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCpfCnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
