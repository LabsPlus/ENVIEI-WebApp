import { Component } from '@angular/core';
import { ButtonStartHomePageComponent } from '../button-start-home-page/button-start-home-page.component';
@Component({
  selector: 'app-header-home-page',
  standalone: true,
  imports: [ButtonStartHomePageComponent],
  templateUrl: './header-home-page.component.html',
  styleUrl: './header-home-page.component.css'
})
export class HeaderHomePageComponent {

}
