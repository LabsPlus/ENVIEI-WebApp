import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service/user.service';
import { IKey } from '../../interfaces/IKey';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator/password-validator.service';
import { EmailValidatorService } from '../../../shared/services/email-validator/email-validator.service';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { ApiKeysService } from '../../services/api-keys-service/api-keys.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-update-key-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService, ApiKeysService, SessionStorageService],
  templateUrl: './update-key-modal.component.html',
  styleUrl: './update-key-modal.component.css'
})
export class UpdateKeyModalComponent {

  keyForm!: FormGroup;
  private accessToken: string = '';
  private afterClosedSubject = new Subject<{ success: boolean }>();
  private key: IKey;

  constructor(
    public dialog: MatDialog,
    private toarstNotification: ToastrNotificationService,
    private apiKeysService: ApiKeysService,
    private sessionStorageService: SessionStorageService,

  ) {
    this.keyForm = new FormGroup({
      keyName: new FormControl(''),
    });

    this.accessToken = this.sessionStorageService.getSessionToken() as string;
    this.key = {} as IKey;
  }

  openDialog(key: IKey) {

    const dialogRef = this.dialog.open(UpdateKeyModalComponent);
    dialogRef.componentInstance.setKeyInformationOnThisObjectInstance(key);
    dialogRef.afterClosed().subscribe(result => { });

  }

  closeDialog() {

    this.dialog.closeAll();
    window.location.reload();
  
  }

  afterClosed() {
    return this.afterClosedSubject.asObservable();
  }

  setKeyInformationOnThisObjectInstance(key: IKey) {
    this.key.id = key.id;
    this.key.name = key.name;
    this.key.user_id = key.user_id;
  }

  
  getKeyNameValueOnTheFormToUpdate() {
    this.key.name = this.keyForm.get('keyName')?.value;
  }

  submit() {

    this.getKeyNameValueOnTheFormToUpdate();
    this.updateKey(this.key)
  }

  isFormValid(): boolean {

    let formValue = this.keyForm.get('keyName')?.value;

    if(formValue === '' || formValue.length == 0){
      this.toarstNotification.showError('O nome da chave está em branco, não podemos submeter assim.', 'Erro');
      return false;
    }

    if(formValue.length <= 1 || formValue.length > 45){
      this.toarstNotification.showError('O nome da chave está no tamanho inadequado, não podemos submeter assim.', 'Erro');
      return false;
    }

    return true;

  }


  async updateKey(key: IKey) {

    if(!this.isFormValid()){
      return;
    }

    this.apiKeysService.updateApiKey(this.accessToken, key).subscribe(
      (response) => {

        if (response.status == 200 || response.status == 201) {
          this.afterClosedSubject.next({ success: true });
          this.toarstNotification.showSuccess('API Key atualizado com sucesso', 'Sucesso');
          this.closeDialog();
        }

        else {
          this.toarstNotification.showError('Erro ao atualizar o API Key', 'Erro');
        }

      },
      (error) => {
        this.toarstNotification.showError('Erro ao atualizar o API Key', 'Erro');
      }
    );
  }

}
