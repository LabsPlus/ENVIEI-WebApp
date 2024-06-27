import { Component } from '@angular/core';
import { StackedBarChartComponent } from '../../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component';
import { LineShartComponent } from '../../../../shared/components/charts/line-shart/line-shart.component';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [StackedBarChartComponent, LineShartComponent],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.css'
})
export class DashboardChartsComponent {

}
