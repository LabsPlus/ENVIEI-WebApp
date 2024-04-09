import { Component, Input, forwardRef } from '@angular/core';
import { IInput } from '../../interfaces/input/input.interfaces';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-input-cpf-cnpj',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCpfCnpjComponent),
      multi: true,
    },
  ],
  templateUrl: './input-cpf-cnpj.component.html',
  styleUrl: './input-cpf-cnpj.component.css',
})
export class InputCpfCnpjComponent implements ControlValueAccessor {
  @Input() props!: IInput;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    this.onChange = this.onChange.bind(this);
    this.onTouched = this.onTouched.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.props.disabled = isDisabled;
  }
}
