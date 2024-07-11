import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StackedBarChartComponent } from '../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { LineShartComponent } from '../../../../shared/components/charts/line-shart/line-shart.component';
import { IndicatorChartComponent } from '../../../../shared/components/charts/indicator-chart/indicator-chart.component';
import { DonutChartComponent } from '../../../../shared/components/charts/donut-chart/donut-chart.component';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [ReactiveFormsModule, StackedBarChartComponent, LineShartComponent, IndicatorChartComponent, CommonModule, DonutChartComponent],
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css']
})
export class DashboardChartsComponent implements OnDestroy {
  isNavOpen = false;
  sidebarOpenSubscription: Subscription;
  selectedOption = 'Últimos 7 dias';
  options = [
    { value: '3', label: 'Últimos 7 dias' },
    { value: '3', label: 'Últimos 14 dias' },
    { value: '4', label: 'Últimos 30 dias' },
    { value: '4', label: 'Últimos 60 dias' },
    { value: '4', label: 'Últimos 90 dias' }
  ];
  menuVisible = false;

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

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  selectOption(option: any) {
    this.selectedOption = option.label;
    this.menuVisible = false;
  }
}
