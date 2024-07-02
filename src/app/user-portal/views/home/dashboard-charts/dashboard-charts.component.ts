import { Component, OnDestroy,ViewEncapsulation } from '@angular/core';
import { StackedBarChartComponent } from '../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { LineShartComponent } from '../../../../shared/components/charts/line-shart/line-shart.component';
import { IndicatorChartComponent } from '../../../../shared/components/charts/indicator-chart/indicator-chart.component';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,StackedBarChartComponent, LineShartComponent, IndicatorChartComponent, CommonModule],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.css'
})
export class DashboardChartsComponent implements OnDestroy{
  panelColor = new FormControl('red');
  isNavOpen = false;
  sidebarOpenSubscription: Subscription;

  constructor(private sidebarService: SidebarService) {
    this.sidebarOpenSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => {
        this.isNavOpen = isOpen;
      }
    );
  }

  ngOnDestroy() {
    this.sidebarOpenSubscription.unsubscribe();
  }
}
