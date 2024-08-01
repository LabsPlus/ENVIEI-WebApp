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
  
  async ngOnInit() {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        let currentUrl = this.location.path() as string;

        if (!currentUrl) {
          return;
        }

        let route = this.splitUrlToGetRoute(currentUrl);

        if (!this.hiddenRoutes.includes(route)) {
          this.isVisible = true;
          return;
        }

        this.isVisible = false;
      }

    });
  }

  splitUrlToGetRoute(url: string): string {
    let currentUrl = url;

    if (!currentUrl) {
      return '';
    }

    
    let hasQueryParams = currentUrl.includes('?');
    let hasChildRoute = currentUrl.includes('/', 2);


    if (!hasQueryParams && !hasChildRoute) {
      return currentUrl;
    }

    if (hasQueryParams) {
      let splitUrl = currentUrl.split('?');
      currentUrl = splitUrl[0];
    }

    if (hasChildRoute) {
      let splitUrl = currentUrl.split('/');
      currentUrl = splitUrl[1];
    }

    return currentUrl;

  }

  public toggleSidebar() {
    this.drawer.toggle();
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.toggleSidebar();
  }
}

