import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stacked-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.css'
})
export class StackedBarChartComponent {

  data = [
    { name: '@hotmail.com', values: [75] },
    { name: '@hotmail.com.br', values: [75] },
    { name: '@labsif.com.br', values: [100] },
    { name: '@gmail.com', values: [25] }
  ];

  colors = ['#A642F4', '#A642F4', '#0443BD',  '#316C87'];
  yTicks = [100, 75, 50, 25, 0];

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
