import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-happiness',
  templateUrl: './happiness.html',
  styleUrls: ['./happiness.scss'],
  standalone: false,
})
export class Happiness implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  currentHappiness = 50;
  history: number[] = this.generateHistory();
  labels: string[] = this.history.map((_, i) => `T-${10 - i}`);

ngAfterViewInit() {
  console.log('AFTER VIEW INIT FIRED');
  requestAnimationFrame(() => {
    this.initChart();
  });
}

  initChart() {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Pleased',
          data: this.history,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100 }
        }
      }
    });
  }

  generateHistory(): number[] {
    let value = 50;
    const arr: number[] = [];

    for (let i = 0; i < 10; i++) {
      value += (Math.random() - 0.5) * 50; // gentle drift
      value = Math.max(0, Math.min(100, value));
      arr.push(Math.round(value));
    }

    return arr;
  }

  setMood(range: [number, number]) {
    const value = this.random(range[0], range[1]);

    this.currentHappiness = value;

    this.history.push(value);
    this.labels.push(`T+${this.history.length}`);

    this.chart.data.datasets[0].data = this.history;
    this.chart.data.labels = this.labels;
    this.chart.update();
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  get moodLabel() {
    if (this.currentHappiness > 80) return 'God Mode 😎';
    if (this.currentHappiness > 60) return 'Vibing 🙂';
    if (this.currentHappiness > 40) return 'Meh 😐';
    if (this.currentHappiness > 20) return 'Down Bad 😩';
    return 'Existential Crisis 💀';
  }
}