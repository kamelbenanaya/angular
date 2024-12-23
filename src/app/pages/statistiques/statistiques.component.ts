import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import Chart from "chart.js/auto";
import { ShipmentService } from "../../services/shipment.service";

@Component({
  selector: "app-statistiques",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="statistics-container">
      <h1>Statistiques</h1>

      <div class="charts-grid">
        <div class="chart-container">
          <h2>delivery Colis</h2>
          <canvas #deliveryColisChart></canvas>
        </div>

        <div class="chart-container">
          <h2>Gain mensuel</h2>
          <canvas #gainMensuelChart></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .statistics-container {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }

      h1 {
        color: #333;
        margin-bottom: 2rem;
      }

      .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 2rem;
      }

      .chart-container {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: #555;
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class StatistiquesComponent implements OnInit, AfterViewInit {
  @ViewChild("deliveryColisChart") deliveryColisChartRef!: ElementRef;
  @ViewChild("gainMensuelChart") gainMensuelChartRef!: ElementRef;

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.deliveryColisChart();
    this.gainMensuelChart();
  }

  deliveryColisChart() {
    const ctx = this.deliveryColisChartRef.nativeElement.getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["pending", "in progress", "delivered"],
        datasets: [
          {
            label: "My First Dataset",
            data: [200, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  gainMensuelChart() {
    const ctx = this.gainMensuelChartRef.nativeElement.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["janvier", "fevrier", "mars", "avril", "mai"],
        datasets: [
          {
            label: "gain mensuel",
            data: [40, 50, 60, 70, 70],
            backgroundColor: "rgb(54, 162, 235)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
