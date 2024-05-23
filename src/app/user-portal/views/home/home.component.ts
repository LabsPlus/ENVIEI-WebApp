import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../components/header-home/header-home.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderHomeComponent, SideBarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
