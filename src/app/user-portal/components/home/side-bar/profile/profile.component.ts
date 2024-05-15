import { Component } from '@angular/core';
import { DangerZoneComponent } from './danger-zone/danger-zone.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DangerZoneComponent, MyProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
