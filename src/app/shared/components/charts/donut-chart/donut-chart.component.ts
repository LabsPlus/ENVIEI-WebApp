import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [],
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements AfterViewInit {

  @Input() percentage: number = 90;

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.drawCanvas();
  }

  drawCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 1.2;
    const radius = Math.min(centerX, centerY) - 10;
    const startAngle = Math.PI; // Starting from the left middle point
    const endAngle = startAngle + (Math.PI * this.percentage / 100);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background arc (base arc)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.strokeStyle = '#D1D1D1';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw percentage arc (foreground arc)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.strokeStyle = '#A259FF';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Draw percentage text
    ctx.fillStyle = '#000';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Valor Atual`, centerX, centerY - 60);
    ctx.font = 'bold 24px Inter';
    ctx.fillText(`${this.percentage}%`, centerX, centerY - 30);
  }
}
