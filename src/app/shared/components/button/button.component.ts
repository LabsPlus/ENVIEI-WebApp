import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IButton } from '../../interfaces/button/button.interfaces';

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
  @Output('submit') onSubmit = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }
}
