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


@Component({
  selector: 'app-dashboard-api-keys',
  standalone: true,
  imports: [ButtonComponent,ButtonSeePlansHomePageComponent,ButtonStartHomePageComponent, CommonModule,MatTableModule, MatPaginatorModule],
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
  acessToken: string;


  constructor(private sidebarService: SidebarService) {
    
    this.sidebarOpenSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => {
        this.isNavOpen = isOpen;
      }
    );

    if (typeof localStorage !== 'undefined') {
      this.acessToken = sessionStorage.getItem('accessToken') as string;
    } else {
      this.acessToken = '';
    }
  }

  ngOnInit() {
    this.#apiKeysService.getApiKeys(this.acessToken).subscribe(
      (response) => {
        this.dataSource.data = response.body as IKey[];
        console.log(this.dataSource.data);
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

  CreateNewKey() {
    console.log('creating new key');
  }

  ngOnDestroy() {
    this.sidebarOpenSubscription.unsubscribe();
  }
}
