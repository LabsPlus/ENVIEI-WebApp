import { Component, Input, forwardRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IInput } from '../../../shared/interfaces/input/input.interfaces';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-password-eye-button',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordEyeButtonComponent),
      multi: true,
    },
  ],
  templateUrl: './password-eye-button.component.html',
  styleUrl: './password-eye-button.component.css'
})
export class PasswordEyeButtonComponent {
  public passwordVisible: boolean = false;

  @Input() props!: IInput;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
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
