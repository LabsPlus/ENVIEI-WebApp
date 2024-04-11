import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonStartHomePageComponent } from '../button-start-home-page/button-start-home-page.component';
import { ButtonSeePlansHomePageComponent } from '../button-see-plans-home-page/button-see-plans-home-page.component';
@Component({
  selector: 'app-first-section-home-page',
  standalone: true,
  imports: [ButtonStartHomePageComponent, ButtonSeePlansHomePageComponent, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './first-section-home-page.component.html',
  styleUrl: './first-section-home-page.component.css'
})
export class FirstSectionHomePageComponent {
  constructor(private route: Router) {}
}
