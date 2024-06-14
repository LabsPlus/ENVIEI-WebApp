import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonStartHomePageComponent } from '../button-start-home-page/button-start-home-page.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StayConnectedService } from '../../../user-portal/services/stay-connected/stay-connected.service';
@Component({
  selector: 'app-header-home-page',
  standalone: true,
  imports: [ButtonStartHomePageComponent,CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header-home-page.component.html',
  providers: [StayConnectedService],
  styleUrl: './header-home-page.component.css'
})
export class HeaderHomePageComponent {

  constructor(private route: Router, private stayConnectedService: StayConnectedService) {}

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

  async accessLogin() {
    const token = this.stayConnectedService.getAccessToken();
    console.log(token, 'token');
    if (token) {
      this.route.navigate(['/home']);
      return;
    }

    this.route.navigate(['/login']);
  }
  
}
