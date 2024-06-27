import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-line-shart',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './line-shart.component.html',
  styleUrls: ['./line-shart.component.css']
})

export class LineShartComponent implements AfterViewInit {

  itemsRadio : number[] = [500,400,300,200,100,0];
  itemsDays : string[] = ['4 days ago','3 days ago','2 days ago','Yesterday'];


  ngAfterViewInit(): void {
    const emailData: number[] = [400, 50, 500, 320];
    this.drawChart(emailData);
  }

  drawChart(emailData: number[]): void {
    const canvas: any = document.getElementById('emailChart');
    const ctx = canvas.getContext('2d');

    const maxEmails = 500;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw horizontal grid lines
    ctx.beginPath();
    for (let i = 0; i <= maxEmails; i += 100) {
      ctx.moveTo(0, canvas.height - (i / maxEmails * canvas.height));
      ctx.lineTo(canvas.width, canvas.height - (i / maxEmails * canvas.height));
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();
    }

    // Draw vertical grid lines (4 lines for 4 days)
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.moveTo(i * (canvas.width / 3), 0);
      ctx.lineTo(i * (canvas.width / 3), canvas.height);
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();
    }

    // Draw lines between points
    const points = emailData.slice(-4).map((value, index) => ({
      x: index * (canvas.width / 3),
      y: canvas.height - (value / maxEmails * canvas.height)
    }));

    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.strokeStyle = '#2083F2';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
