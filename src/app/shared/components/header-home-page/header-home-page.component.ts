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


  navigate() {
    this.onNavigate.emit();
  }
  onSignIn() {
    alert('Sign In');
    this.router.navigate(['/register']);
  }

  onClick() {
    alert('Click');
    this.router.navigate(['/register']);
  }
  submit() {
    alert('Submit');
    this.router.navigate(['/register']);
  }
  onSignUp() {

  }

  onContact() {

  }

  
}
