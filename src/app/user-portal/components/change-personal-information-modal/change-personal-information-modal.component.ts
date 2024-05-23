import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-change-personal-information-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './change-personal-information-modal.component.html',
  styleUrl: './change-personal-information-modal.component.css'
})
export class ChangePersonalInformationModalComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ChangePersonalInformationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
