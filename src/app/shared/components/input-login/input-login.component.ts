import { Component, Input, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { IInput } from '../../interfaces/input/input.interfaces';

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLoginComponent),
      multi: true,
    },
  ],
  templateUrl: './input-login.component.html',
  styleUrl: './input-login.component.css',
})
export class InputLoginComponent implements ControlValueAccessor{
  @Input() props!: IInput;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

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
