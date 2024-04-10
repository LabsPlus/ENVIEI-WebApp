import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonStartHomePageComponent } from '../button-start-home-page/button-start-home-page.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-home-page',
  standalone: true,
  imports: [ButtonStartHomePageComponent],
  templateUrl: './header-home-page.component.html',
  styleUrl: './header-home-page.component.css'
})
export class HeaderHomePageComponent {

  constructor(private router: Router) {}

  @Output('submit') onSubmit = new EventEmitter();
  @Output('navigate') onNavigate = new EventEmitter();
  onClick() {
    
  }

  navigate() {
    this.onNavigate.emit();
  }
  onSignIn() {
    this.router.navigate(['/login']);
  }

  onSignUp() {

  }

  onContact() {

  }

  
}
