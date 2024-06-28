import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator-chart',
  standalone: true,
  templateUrl: './indicator-chart.component.html',
  styleUrls: ['./indicator-chart.component.css']
})
export class IndicatorChartComponent implements OnInit {

  openRate: number = 75; //mock
  clickRate: number = 25; //mock

  ngOnInit(): void {
    this.drawChart(this.openRate, this.clickRate);
  }

  drawChart(openRate: number, clickRate: number): void {
    const canvas = document.getElementById('indicatorChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const radius = Math.min(canvas.width, canvas.height) / 2;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const innerRadius = radius * 0.5; 

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f0f0f0';
      ctx.fill();

      // Sección of emails open
      const startAngleOpen = -0.5 * Math.PI; 
      const endAngleOpen = startAngleOpen + (openRate / 100) * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngleOpen, startAngleOpen + (openRate / 100) * 2 * Math.PI);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = '#36a2eb';
      ctx.fill();

      // Seccion of emails clickados
      const startAngleClick = -0.5 * Math.PI; 
      const endAngleClick = startAngleClick - (clickRate / 100) * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngleClick, startAngleClick - (clickRate / 100) * 2 * Math.PI, true);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = '#ffce56';
      ctx.fill();

      // Circle intern
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f0f0f0';
      ctx.fill();

    }
  }


  fetchData(): void {
    const data = {
      openRate: 80, 
      clickRate: 20 
    };

    // updates the chart with new data
    this.drawChart(data.openRate, data.clickRate);
  }
}
