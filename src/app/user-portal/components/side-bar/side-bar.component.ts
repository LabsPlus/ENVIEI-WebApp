import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive,Router, NavigationEnd } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})

export class SideBarComponent implements OnInit{
  showFiller = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  isSidebarOpen: boolean = false;
  isVisible: boolean = true;
  hiddenRoutes = ['/login', '/register', '/forgot-password', '/new-password', ''];

  
  constructor(
    private sidebarService: SidebarService,
    private location: Location,
    private router: Router,
  ) {
    this.drawer = {} as MatDrawer;
    this.isVisible = false;
  }
  
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentPath = this.location.path();
        this.isVisible = !this.hiddenRoutes.includes(currentPath);
      }
    });
  }  

  public toggleSidebar() {
    this.drawer.toggle();
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.toggleSidebar();
  }
}

