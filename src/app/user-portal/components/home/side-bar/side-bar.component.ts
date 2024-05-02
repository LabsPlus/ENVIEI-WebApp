import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
export class SideBarComponent {
  showFiller = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  isSidebarOpen: boolean = false;

  constructor(public router: Router, private route: ActivatedRoute) {
    this.drawer = {} as MatDrawer;
  }

  private hiddenRoutes = ['', '/login', '/register'];

  public isSidebarVisibleOnOtherComponents() {
    return !this.hiddenRoutes.includes(this.router.url);
  }

  public toggleSidebar() {
    this.drawer.toggle();
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
