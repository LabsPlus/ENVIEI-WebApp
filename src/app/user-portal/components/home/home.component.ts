import { Component } from '@angular/core';
import { HeaderHomeComponent } from './header-home/header-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
