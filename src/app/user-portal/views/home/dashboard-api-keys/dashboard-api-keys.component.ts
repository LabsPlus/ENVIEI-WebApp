import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ButtonSeePlansHomePageComponent } from '../../../../shared/components/button-see-plans-home-page/button-see-plans-home-page.component';
import { ButtonStartHomePageComponent } from '../../../../shared/components/button-start-home-page/button-start-home-page.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { SlideToggleComponent } from '../../../../shared/components/slide-toggle/slide-toggle.component';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';
import { GenerateKeyModalComponent } from '../../../components/generate-key-modal/generate-key-modal.component';
import { UpdateKeyModalComponent } from '../../../components/update-key-modal/update-key-modal.component';
import { IKey } from '../../../interfaces/IKey';
import { ApiKeysService } from '../../../services/api-keys-service/api-keys.service';
import { FormaterService } from '../../../services/formater-service/formater.service';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { ToastrNotificationService } from '../../../services/toastr/toastr.service';
import { DeleteKeyPopupComponent } from '../../../components/delete-key-popup/delete-key-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-api-keys',
  standalone: true,
  imports: [DeleteKeyPopupComponent,
    SlideToggleComponent, FormsModule, ReactiveFormsModule, InputSearchComponent, ButtonComponent,
    ButtonSeePlansHomePageComponent, ButtonStartHomePageComponent, CommonModule, MatTableModule,
    MatPaginatorModule
  ],
  providers: [ApiKeysService, ToastrNotificationService, FormaterService, GenerateKeyModalComponent, Clipboard, SessionStorageService, UpdateKeyModalComponent],
  templateUrl: './dashboard-api-keys.component.html',
  styleUrl: './dashboard-api-keys.component.css'
})

export class DashboardApiKeysComponent implements AfterViewInit, OnInit {
  isNavOpen = false;
  sidebarOpenSubscription: Subscription;
  displayedColumns: string[] = ['Status', 'Name', 'API Key', 'Ativar/Desativar', 'Ações'];
  dataSource = new MatTableDataSource<IKey>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  #apiKeysService = inject(ApiKeysService);
  accessToken: string;
  searchForm!: FormGroup;

  constructor(
    private sidebarService: SidebarService, private sessionStorageService: SessionStorageService,
    private toastr: ToastrNotificationService, private formaterService: FormaterService,
    private createKeyDialog: GenerateKeyModalComponent, private clipboard: Clipboard,
    private updateKeyDialog: UpdateKeyModalComponent,
    private dialog: MatDialog
  ) {

    this.sidebarOpenSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => {
        this.isNavOpen = isOpen;
      }
    );

    this.accessToken = this.sessionStorageService.getSessionToken() as string;

    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  ngOnInit() {
    this.#apiKeysService.getApiKeys(this.accessToken).subscribe(
      (response) => {

        const apiKeys = response.body as IKey[];
        this.dataSource.data = apiKeys;
        this.applyApiKeyFormatting();

      },
      (error) => {
        console.error(error);
      }
    );

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.sidebarOpenSubscription.unsubscribe();
  }

  async openGenerateKeyModal() {
    this.createKeyDialog.openDialog();
  }

  openDeleteKeyModal(key: IKey): void {
    const dialogRef = this.dialog.open(DeleteKeyPopupComponent);
    dialogRef.componentInstance.confirmDelete.subscribe(() => {
      this.deleteKey(key);
    });
  }

  deleteKey(key: IKey): void {
    this.#apiKeysService.deleteApiKey(this.accessToken, key).subscribe(
      () => {
        this.toastr.showSuccess('Chave deletada com sucesso', 'Éxito');
        this.dataSource.data = this.dataSource.data.filter(k => k.id !== key.id);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.toastr.showError('Chave não pôde ser deletada', 'Error');
        console.log(error);
      }
    );
  }

  closeGenerateKeyModal() {
    this.createKeyDialog.closeDialog();
  }


  async updateKeyModal(key: IKey) {
    this.updateKeyDialog.openDialog(key);
  }

  closeUpdateKeyModal() {
    this.updateKeyDialog.closeDialog();
  }

  search() {
    this.dataSource.filter = this.searchForm.value.search.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();

    const filteredData = this.dataSource.filteredData;

    if(filteredData.length == 0){
      this.toastr.showInfo('Nenhum resultado encontrado', 'Info');
    }
  }

  copyToClipboard(value: string) {
    this.clipboard.copy(value);
    this.toastr.showSuccess('API Key copiado para a área de transferência', 'Sucesso');
  }

  async toggleSwitch(apiKey: IKey) {

    apiKey.is_active = !apiKey.is_active;

    this.#apiKeysService.toggleApiKey(this.accessToken, apiKey.id as number, apiKey.is_active).subscribe(
      (response) => {
        this.toastr.showSuccess('Status do API Key alterado com sucesso', 'Sucesso');
      },
      (error) => {
        this.toastr.showError('Erro ao alterar o status do API Key', 'Erro');
      }
    );
  }


  applyApiKeyFormatting() {
    this.dataSource.data.forEach((element) => {
      element.formattedApiKey = this.formatApiKey(element.value as string);
    });
  }

  formatApiKey(apiKey: string) {
    return this.formaterService.formatApiKey(apiKey);
  }

}
