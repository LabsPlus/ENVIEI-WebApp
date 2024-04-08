import { Component, Input, forwardRef } from '@angular/core';
import { IInput } from '../../interfaces/input.interfaces';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css'
})
export class InputPasswordComponent implements ControlValueAccessor{
  @Input() props!: IInput;

  public passwordVisible: boolean = false;

  // Função para alternar a visibilidade da senha
  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.querySelector('.input-password') as HTMLInputElement;
    inputElement.type = this.passwordVisible ? 'text' : 'password';
  }

  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}

}
