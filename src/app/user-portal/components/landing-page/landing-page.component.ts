import { Component } from '@angular/core';
import { HeaderHomePageComponent } from '../../../shared/components/header-home-page/header-home-page.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderHomePageComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
