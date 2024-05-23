import { Component } from '@angular/core';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderHomeComponent, SideBarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
