import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
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
  
  @Output()
  isSidebarOpen: boolean = false;

  isVisible: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    private location: Location,
    private router: Router,
  ) {
    this.drawer = {} as MatDrawer;
    this.isVisible = false;
  }
  
  async ngOnInit() {
  }


  public toggleSidebar() {
    this.drawer.toggle();
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.toggleSidebar();
  }

  goToRoute(route: string) {

    alert('Go to route: ' + route);
    this.router.navigate([route]);
  }
}

