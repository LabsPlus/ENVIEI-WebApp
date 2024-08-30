import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DangerZoneComponent } from './danger-zone/danger-zone.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../../components/header-home/header-home.component';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { SideBarButtonComponent } from '../../../components/side-bar-button/side-bar-button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DangerZoneComponent, MyProfileComponent, CommonModule, HeaderHomeComponent, SideBarComponent, SideBarButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  isNavOpen = false;
  sideBarOpen = false;

  constructor(private sidebarService: SidebarService) { }


  onClick() {
    
    this.sideBarOpen = !this.sideBarOpen;

  }

  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;
  
  isSidebarOpen: boolean = false;

  async ngAfterViewInit() {
    this.isSidebarOpen = this.sidebar.isSidebarOpen;
  }

  handleToggleSidebar() {
    this.sideBarOpen = !this.sideBarOpen;
    this.sidebarService.toggleSidebar();
  }
}
