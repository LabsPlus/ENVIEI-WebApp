import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ButtonSeePlansHomePageComponent } from '../../../../shared/components/button-see-plans-home-page/button-see-plans-home-page.component';
import { ButtonStartHomePageComponent } from '../../../../shared/components/button-start-home-page/button-start-home-page.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ApiKeysService } from '../../../services/api-keys-service/api-keys.service';
import { IKey } from '../../../interfaces/IKey';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SlideToggleComponent } from '../../../../shared/components/slide-toggle/slide-toggle.component';
import { StayConnectedService } from '../../../services/stay-connected/stay-connected.service';

@Component({
  selector: 'app-dashboard-api-keys',
  standalone: true,
  imports: [SlideToggleComponent, FormsModule,ReactiveFormsModule,InputSearchComponent,ButtonComponent,ButtonSeePlansHomePageComponent,ButtonStartHomePageComponent, CommonModule,MatTableModule, MatPaginatorModule],
  providers: [ApiKeysService],
  templateUrl: './dashboard-api-keys.component.html',
  styleUrl: './dashboard-api-keys.component.css'
})
export class DashboardApiKeysComponent implements AfterViewInit, OnInit{
  isNavOpen = false;
  sidebarOpenSubscription: Subscription;
  displayedColumns: string[] = ['Status', 'Name', 'API Key', 'Ativar/Desativar', 'Ações'];
  dataSource = new MatTableDataSource<IKey>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  #apiKeysService = inject(ApiKeysService);
  accessToken: string;
  searchForm! : FormGroup;
  isOn: boolean = false;


  constructor(private sidebarService: SidebarService, private stayConnectedService: StayConnectedService) {
    
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

  Search() {
    console.log('searching');
  }

  toggleSwitch(){
    this.isOn = !this.isOn;
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
    const totalChars = apiKey.length;
  
    if (totalChars < 20) {
        return '*'.repeat(totalChars);
    }
  
    const visibleChars = apiKey.slice(16, 19);
  
    const hiddenChars = '*'.repeat(16) + visibleChars + '*'.repeat(totalChars - 19);
  
    return hiddenChars;
}
  
  

  ngOnDestroy() {
    this.sidebarOpenSubscription.unsubscribe();
  }
}
