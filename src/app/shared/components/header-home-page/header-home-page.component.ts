import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonStartHomePageComponent } from '../button-start-home-page/button-start-home-page.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header-home-page',
  standalone: true,
  imports: [ButtonStartHomePageComponent,CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header-home-page.component.html',
  styleUrl: './header-home-page.component.css'
})
export class HeaderHomePageComponent {

  constructor(private route: Router) {}

  @Output('submit') onSubmit = new EventEmitter();
  @Output('navigate') onNavigate = new EventEmitter();


  navigate() {
    this.onNavigate.emit();
  }
  onSignIn() {
    alert('Sign In');
    this.route.navigate(['/register']);
  }

  onClick() {
    alert('Click');
    this.route.navigate(['/register']);
  }
  submit() {
    alert('Submit');
    this.route.navigate(['/register']);
  }
  onSignUp() {

  }

  onContact() {

  }

  
}
