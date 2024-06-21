import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ButtonSeePlansHomePageComponent } from '../../../../shared/components/button-see-plans-home-page/button-see-plans-home-page.component';
import { ButtonStartHomePageComponent } from '../../../../shared/components/button-start-home-page/button-start-home-page.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiKeysService } from '../../../services/api-keys-service/api-keys.service';
import { IKey } from '../../../interfaces/IKey';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SlideToggleComponent } from '../../../../shared/components/slide-toggle/slide-toggle.component';
import { StayConnectedService } from '../../../services/stay-connected/stay-connected.service';
import { ToastrNotificationService } from '../../../services/toastr/toastr.service';
import { FormaterService } from '../../../services/formater-service/formater.service';

@Component({
  selector: 'app-dashboard-api-keys',
  standalone: true,
  imports: [SlideToggleComponent, FormsModule, ReactiveFormsModule, InputSearchComponent, ButtonComponent, ButtonSeePlansHomePageComponent, ButtonStartHomePageComponent, CommonModule, MatTableModule, MatPaginatorModule],
  providers: [ApiKeysService, ToastrNotificationService, FormaterService],
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
  isOn: boolean = false;


  constructor(private sidebarService: SidebarService, private stayConnectedService: StayConnectedService, private toastr: ToastrNotificationService, private formaterService: FormaterService) {

    this.sidebarOpenSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => {
        this.isNavOpen = isOpen;
      }
    );

    this.accessToken = this.stayConnectedService.getAccessToken() as string;

    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  ngOnInit() {
    this.#apiKeysService.getApiKeys(this.accessToken).subscribe(
      (response) => {
        this.dataSource.data = response.body as IKey[];
        this.applyApiKeyFormatting();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  ngOnDestroy() {
    this.sidebarOpenSubscription.unsubscribe();
  }
  
  Search() {
    console.log('searching');
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

  CreateNewKey() {
    console.log('creating new key');
  }


  applyApiKeyFormatting() {
    this.dataSource.data.forEach((element) => {
      element.formattedApiKey = this.formatApiKey(element.value as string);
    });
  }

  formatApiKey(apiKey: string) {
    return this.formaterService.formatApiKey(apiKey);
  }


  setApiKeyStatus(key: IKey) {
    
  }

  async updateKey(key: IKey) {
    await this.#apiKeysService.updateApiKey(this.accessToken, key).subscribe(
      (response) => {
        this.toastr.showSuccess('API Key atualizado com sucesso', 'Sucesso');
      },
      (error) => {
        this.toastr.showError('Erro ao atualizar o API Key', 'Erro');
      }
    );
  }
}
