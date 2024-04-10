import { Component, Input, forwardRef } from '@angular/core';
import { IInput } from '../../interfaces/input/input.interfaces';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'app-input-double-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDoublePasswordComponent),
      multi: true,
    },
  ],
  templateUrl: './input-double-password.component.html',
  styleUrl: './input-double-password.component.css'
})
export class InputDoublePasswordComponent implements ControlValueAccessor {

  public passwordVisible: { [key: string]: boolean } = { password: false, confirm: false };
  public passwordCtrl: FormControl = new FormControl('');
  public confirmPasswordCtrl: FormControl = new FormControl('');


  @Input() props!: IInput;


  // Função para alternar a visibilidade da senha
  constructor() {}
  writeValue(obj: any): void {
    if (obj) {
      this.passwordCtrl.setValue(obj.password);
      this.confirmPasswordCtrl.setValue(obj.confirmPassword);
    } else {
      this.passwordCtrl.setValue('');
      this.confirmPasswordCtrl.setValue('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.passwordCtrl.disable();
      this.confirmPasswordCtrl.disable();
    } else {
      this.passwordCtrl.enable();
      this.confirmPasswordCtrl.enable();
    }
  }

  private onChange: any = () => {};
  private onTouched: any = () => {};

  // Função para alternar a visibilidade da senha
  public togglePasswordVisibility(field: string): void {
    this.passwordVisible[field] = !this.passwordVisible[field];
    const inputElement = document.getElementById(`input-${field}`) as HTMLInputElement;
    inputElement.type = this.passwordVisible[field] ? 'text' : 'password';
  }

  // Função para validar as senhas
  public validatePasswords(): { [key: string]: boolean } | null {
    if (this.passwordCtrl.value !== this.confirmPasswordCtrl.value) {
      return { mismatch: true };
    }
    return null;
  }

  // Função para adicionar a mensagem de erro
  public getErrorMessage(): string {
    if (this.passwordCtrl.hasError('mismatch')) {
      return 'As senhas não coincidem.';
    }
    return '';
  }

  // Função chamada ao inserir uma senha
  public onPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.passwordCtrl.setValue(value);
    this.confirmPasswordCtrl.setValue(this.confirmPasswordCtrl.value);
  }

  // Função chamada ao inserir uma confirmação de senha
  // Função chamada ao tocar no campo
  public onTouch(): void {
    if (this.props.onTouched) {
      this.props.onTouched();
    }
  }
}
