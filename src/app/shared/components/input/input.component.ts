import { Component, Input } from '@angular/core';
import { IInput } from '../../interfaces/input.interfaces';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() props!: IInput;
}
