import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../components/header-home/header-home.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderHomeComponent, SideBarComponent, CommonModule, RouterOutlet],
  providers: [SidebarService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private sidebarService: SidebarService) { }

  sideBarOpen = false;

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
