import { Component, Input, forwardRef } from '@angular/core';
import { IInput } from '../../interfaces/input.interfaces';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLoginComponent),
      multi: true,
    },],
  templateUrl: './input-login.component.html',
  styleUrl: './input-login.component.css'
})
export class InputLoginComponent implements ControlValueAccessor{
  @Input() props!: IInput;
  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
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
