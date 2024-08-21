import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../components/header-home/header-home.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderHomeComponent, SideBarComponent, CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() { }

  sideBarOpen = false;

  verifySideBarOpen(event: any) {
    this.sideBarOpen = event;
  }

}
