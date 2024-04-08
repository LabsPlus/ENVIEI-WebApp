import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output("submit") onSubmit = new EventEmitter();

  @Output("navigate") onNavigate = new EventEmitter();
  
  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }
  onClick() {
    this.submit();
  }
}
