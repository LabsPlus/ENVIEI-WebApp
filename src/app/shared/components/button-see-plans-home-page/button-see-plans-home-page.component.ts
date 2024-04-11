import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IButton } from '../../interfaces/button/button.interfaces';

@Component({
  selector: 'app-button-see-plans-home-page',
  standalone: true,
  imports: [],
  templateUrl: './button-see-plans-home-page.component.html',
  styleUrl: './button-see-plans-home-page.component.css'
})
export class ButtonSeePlansHomePageComponent {
  
  @Input()
  props!: IButton;
  @Output('submit') onSubmit = new EventEmitter();
  onClick() {
    
  }

  submit() {
    this.onSubmit.emit();
  }
}
