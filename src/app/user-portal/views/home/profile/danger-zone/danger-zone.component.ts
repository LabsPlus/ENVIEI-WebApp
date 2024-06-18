import { Component } from '@angular/core';
import { DeleteProfileModalComponent } from '../../../../components/delete-profile-modal/delete-profile-modal.component';

@Component({
  selector: 'app-danger-zone',
  standalone: true,
  imports: [],
  providers: [DeleteProfileModalComponent,],
  templateUrl: './danger-zone.component.html',
  styleUrl: './danger-zone.component.css'
})
export class DangerZoneComponent {
  constructor(
    private deleteProfileModalComponent : DeleteProfileModalComponent
  ){

  }
    openDeleteProfileModal(){
      this.deleteProfileModalComponent.openDialog();
    }
  
}
