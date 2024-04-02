import { Component, Input } from '@angular/core';
import { IInput } from '../../interfaces/input.interfaces';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css'
})
export class InputPasswordComponent {
  @Input() props!: IInput;

  public passwordVisible: boolean = false;

  // Função para alternar a visibilidade da senha
  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.querySelector('.input-password') as HTMLInputElement;
    inputElement.type = this.passwordVisible ? 'text' : 'password';
  }
}
