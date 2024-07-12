import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MatDialogModule  } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-key-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-key-popup.component.html',
  styleUrl: './delete-key-popup.component.css'
})
export class DeleteKeyPopupComponent {
  @Output() confirmDelete = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<DeleteKeyPopupComponent>) {}

  onConfirm(): void {
    this.confirmDelete.emit();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
