import { Component, OnDestroy } from '@angular/core';
import { DangerZoneComponent } from './danger-zone/danger-zone.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../../components/header-home/header-home.component';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DangerZoneComponent, MyProfileComponent, CommonModule, HeaderHomeComponent, SideBarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnDestroy{
  isNavOpen = false;
  sidebarOpenSubscription: Subscription;

  constructor(private sidebarService: SidebarService) {
    this.sidebarOpenSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => {
        this.isNavOpen = isOpen;
      }
    );
  }

  ngOnDestroy() {
    this.sidebarOpenSubscription.unsubscribe();
  }

}
