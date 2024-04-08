import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IInput } from '../../interfaces/input.interfaces';
import { CommonModule, NgIf } from '@angular/common';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-phone-number',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPhoneNumberComponent),
      multi: true,
    },
  ],
  templateUrl: './input-phone-number.component.html',
  styleUrl: './input-phone-number.component.css'
})

export class InputPhoneNumberComponent implements ControlValueAccessor{

  ///fix Can't bind to 'ngModelOptions' since it isn't a known property of 'input'.
  @Input() ngModelOptions: FormsModule;
  @Input() ngModel: any;
  @Input() props!: IInput;

  phoneNumber: string = '';
  messageError: string = '';

  constructor() {

    this.ngModelOptions = {
      standalone: true
    };

    this.ngModel = this.phoneNumber;
  }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  validatePhoneNumberFormat(phoneNumber: string) {

    const regex = /^(\d{2})(\d{4})(\d{4})$/;

    if (!regex.test(phoneNumber)) {
      return "Número de telefone inválido!";
    }

    if (phoneNumber.length !== 12) {
      return "Número de telefone precisa ter 11 dígitos!";
    }

    return null;
  }


  validateInput() {
    const error = this.validatePhoneNumberFormat(this.phoneNumber);

    if (error) {
      this.props.error = error;
      return;
    }

    this.props.error = null;
  }


  onInput(event: any) {
    this.phoneNumber = event.target.value;
    this.validateInput();
  }

  onBlur(event: any) {
    this.validateInput();
  }

  onFocus(event: any) {
    this.props.error = null;
  }

  mensagemError = this.validatePhoneNumberFormat(this.phoneNumber);
}
