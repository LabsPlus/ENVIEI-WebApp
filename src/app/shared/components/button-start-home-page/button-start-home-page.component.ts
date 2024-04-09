import { Component, Input } from '@angular/core';
import { IButton } from '../../interfaces/button/button.interfaces';

@Component({
  selector: 'app-button-start-home-page',
  standalone: true,
  imports: [],
  templateUrl: './button-start-home-page.component.html',
  styleUrl: './button-start-home-page.component.css'
})
export class ButtonStartHomePageComponent {
  @Input()
  props!: IButton;

  onClick() {
    
  }
}
