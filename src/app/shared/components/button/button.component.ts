import { Component, Input } from '@angular/core';
import { IButton } from '../../interfaces/button.interfaces';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  props!: IButton;

  onClick() {
    console.log('Button clicked');
  }
}
