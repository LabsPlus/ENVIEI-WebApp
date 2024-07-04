import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator-chart',
  standalone: true,
  templateUrl: './indicator-chart.component.html',
  styleUrls: ['./indicator-chart.component.css']
})
export class IndicatorChartComponent implements OnInit {

  openRate: number = 80; // Mock data inicial
  clickRate: number = 20; // Mock data inicial

  ngOnInit(): void {
    this.drawChart(this.openRate, this.clickRate);
    this.updateLabels(this.openRate, this.clickRate);
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

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f0f0f0';
      ctx.fill();

      const startAngleOpen = -0.5 * Math.PI;
      const endAngleOpen = startAngleOpen + (openRate / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngleOpen, endAngleOpen);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = '#0443BD';
      ctx.fill();

      const startAngleClick = -0.5 * Math.PI;
      const endAngleClick = startAngleClick - (clickRate / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngleClick, endAngleClick, true);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = '#FBBC04';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f0f0f0';
      ctx.fill();
    }
  }

  updateLabels(openRate: number, clickRate: number): void {
    const openLabel = document.getElementById('openLabel');
    const clickLabel = document.getElementById('clickLabel');

    if (openLabel) {
      openLabel.textContent = `Abertos: ${openRate}%`;
    }
    if (clickLabel) {
      clickLabel.textContent = `Clicke en links: ${clickRate}%`;
    }
  }
}
