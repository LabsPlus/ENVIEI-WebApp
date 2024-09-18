import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MatDialogModule  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-key-popup',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './delete-key-popup.component.html',
  styleUrl: './delete-key-popup.component.css'
})
export class DeleteKeyPopupComponent {
  @Output() confirmDelete = new EventEmitter<void>();
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<DeleteKeyPopupComponent>) {}

  onConfirm(): void {
    this.confirmDelete.emit();
    this.applyLoadingIndicator();
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  applyLoadingIndicator(){
    this.isLoading = true;

    setTimeout(() =>{
      this.isLoading = false;
      this.dialogRef.close();
    }, 3000);
  }


}
