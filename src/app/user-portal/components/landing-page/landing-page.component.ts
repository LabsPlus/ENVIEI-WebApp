import { Component } from '@angular/core';
import { HeaderHomePageComponent } from '../../../shared/components/header-home-page/header-home-page.component';
import { FooterHomePageComponent } from '../../../shared/components/footer-home-page/footer-home-page.component';
import { FirstSectionHomePageComponent } from '../../../shared/components/first-section-home-page/first-section-home-page.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderHomePageComponent, FooterHomePageComponent, FirstSectionHomePageComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
