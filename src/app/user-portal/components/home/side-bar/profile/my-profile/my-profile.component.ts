import { Component } from '@angular/core';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent {
  color: ThemePalette = 'primary';
}
