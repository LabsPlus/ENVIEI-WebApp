import { Component } from '@angular/core';
import { ButtonStartHomePageComponent } from '../button-start-home-page/button-start-home-page.component';
import { ButtonSeePlansHomePageComponent } from '../button-see-plans-home-page/button-see-plans-home-page.component';
@Component({
  selector: 'app-dev-section-home-page',
  standalone: true,
  imports: [ButtonStartHomePageComponent, ButtonSeePlansHomePageComponent],
  templateUrl: './dev-section-home-page.component.html',
  styleUrl: './dev-section-home-page.component.css'
})
export class DevSectionHomePageComponent {

}
