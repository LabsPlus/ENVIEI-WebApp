import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.css'
})
export class SlideToggleComponent {
@Input() isOn: boolean = false;


  constructor() {
  }

  toggleSwitch() {
    this.isOn = !this.isOn;
  }

}
