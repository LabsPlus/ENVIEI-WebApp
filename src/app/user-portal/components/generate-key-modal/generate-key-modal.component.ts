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
import { response } from 'express';

@Component({
  selector: 'app-generate-key-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService, ApiKeysService, SessionStorageService],
  templateUrl: './generate-key-modal.component.html',
  styleUrl: './generate-key-modal.component.css'
})
export class GenerateKeyModalComponent {

  keyForm!: FormGroup;
  accessToken: string = '';
  private afterClosedSubject = new Subject<{ success: boolean }>();
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toarstNotification: ToastrNotificationService,
    private apiKeysService: ApiKeysService,
    private sessionStorageService: SessionStorageService,

  ) {
    this.keyForm = new FormGroup({
      keyName: new FormControl(''),
    });
    this.accessToken = this.sessionStorageService.getSessionToken() as string;
  }

  openDialog() {
    const dialogRef = this.dialog.open(GenerateKeyModalComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

  afterClosed() {
    return this.afterClosedSubject.asObservable();
  }

  closeDialog() {

    this.dialog.closeAll();
    window.location.reload();
  }

  submit() {
    this.createKey();
  }

  isFormValid(): boolean {

    let formValue = this.keyForm.get('keyName')?.value;
    return formValue.length > 1 && formValue.length < 45 ? true : false;

  }

  async createKey() {

    if (!this.isFormValid()) {
      this.toarstNotification.showError('Nome da chave inválido, o tamanho deve ser entre 2 e 45 caracteres', 'Erro');
      return;
    }

    this.disableInputFieldAfterSubmit();

    this.applyLoadingIndicator();
    
    this.apiKeysService.createApiKey(this.accessToken, await this.getKeyInfoToCreate() as IKey).subscribe(
      (response) => {
        if (response.status == 201 || response.status == 200) {
          this.toarstNotification.showSuccess('Chave criada com sucesso!', 'Sucesso');
          this.closeDialog();
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toarstNotification.showError('Erro ao criar chave', 'Erro');
        }
      }
    );
  }

  getKeyNameInTheForm(): string {
    return this.keyForm.get('keyName')?.value;
  }

  async getUserId(): Promise<number> {

    let userId = -1;

    await this.userService.getUserData(this.accessToken)
      .toPromise()
      .then(

        (response: HttpResponse<Object | any> | undefined) => {

          if (response?.status == 200 || response?.status == 201) {
            userId = response.body?.id;
          }
        })
      .catch((error: HttpErrorResponse) => {
        this.toarstNotification.showError('Erro ao atualizar dados', 'Erro');
        console.error(error);
      });

    return userId;
  }

  async getKeyInfoToCreate(): Promise<IKey> {

    let keyInfo: IKey = {
      name: this.getKeyNameInTheForm(),
      user_id: await this.getUserId(),
      is_active: true
    };

    return keyInfo;
  }


  applyLoadingIndicator(): void {
    
    this.isLoading = true;
    
  }

  disableInputFieldAfterSubmit(): void {
    
    let inputField = document.getElementById('name') as HTMLInputElement;
    inputField.disabled = true;

  }

}
