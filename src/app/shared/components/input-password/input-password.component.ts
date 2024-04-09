import { Component, Input, forwardRef } from '@angular/core';
import { IInput } from '../../interfaces/input/input.interfaces';
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
  styleUrl: './input-password.component.css',
})
export class InputPasswordComponent {
  public passwordVisible: boolean = false;

  @Input() props!: IInput;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  // Função para alternar a visibilidade da senha
  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.querySelector(
      '.input-password'
    ) as HTMLInputElement;
    inputElement.type = this.passwordVisible ? 'text' : 'password';
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.props.disabled = isDisabled;
  }
}
