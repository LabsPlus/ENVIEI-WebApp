import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './side-bar-button.component.html',
  styleUrl: './side-bar-button.component.css'
})
export class SideBarButtonComponent {

  @Output() 
  onClick() {}
}
