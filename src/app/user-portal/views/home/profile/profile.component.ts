import { Component, OnDestroy } from '@angular/core';
import { DangerZoneComponent } from './danger-zone/danger-zone.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DangerZoneComponent, MyProfileComponent, CommonModule],
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
