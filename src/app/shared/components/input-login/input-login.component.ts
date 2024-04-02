import { Component, Input } from '@angular/core';
import { IInput } from '../../interfaces/input.interfaces';

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [],
  templateUrl: './input-login.component.html',
  styleUrl: './input-login.component.css'
})
export class InputLoginComponent {
  @Input() props!: IInput;
}
