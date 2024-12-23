import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShipmentService } from "../../services/shipment.service";

export interface Shipment {
  id: number;
  numero: string;
  poids: number;
  dimension: string;
  contenu: string;
  date: Date;
  status: "pending" | "in progress" | "delivered";
}

@Component({
  selector: "app-shipment-schedule",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="schedule-container">
      <h2>Shipment Schedule</h2>

      <div class="calendar-widget">
        <div class="calendar-controls">
          <button (click)="goToPreviousMonth()">←</button>
          <span>{{ currentViewDate | date : "MMMM yyyy" }}</span>
          <button (click)="goToNextMonth()">→</button>
        </div>

        <div class="calendar-grid">
          <div class="day-header" *ngFor="let day of daysOfWeek">{{ day }}</div>
          <div
            *ngFor="let day of daysInMonth"
            [class.selected]="isDateSelected(day)"
            [class.has-shipment]="hasShipmentOnDate(day)"
            (click)="onDateSelect(day)"
            class="day-cell"
          >
            {{ day?.getDate() }}
          </div>
        </div>
      </div>

      <div class="shipment-details" *ngIf="selectedDateShipments.length > 0">
        <h3>Shipments for {{ selectedDate | date : "dd/MM/yyyy" }}</h3>

        <div
          class="shipment-card"
          *ngFor="let shipment of selectedDateShipments"
        >
          <div class="card-header">
            <img src="assets/captain.png" alt="captain" />
            <div class="shipment-status" [class]="shipment.status">
              <img src="assets/pending.png" alt="pending" />
            </div>
          </div>

          <div class="card-content">
            <div class="shipment-info">
              <img src="assets/package.png" alt="package" />
              <div class="shipment-details">
                <p>Tracking: {{ shipment.numero }}</p>
                <p>Weight: {{ shipment.poids }} kg</p>
                <p>Size: {{ shipment.dimension }}</p>
                <p>Description: {{ shipment.contenu }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .schedule-container {
        padding: 2rem;
        background: #f9fafc;
        border-radius: 8px;
        margin: 2rem;
      }

      .calendar-widget {
        margin: 2rem 0;
      }

      .calendar-controls {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
      }

      .day-header {
        text-align: center;
        font-weight: bold;
      }

      .day-cell {
        text-align: center;
        padding: 0.5rem;
        border: 1px solid #ccc;
        cursor: pointer;
      }

      .day-cell.selected {
        background-color: #2196f3;
        color: white;
      }

      .day-cell.has-shipment {
        border-color: #4caf50;
        font-weight: bold;
      }

      .shipment-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      .card-header {
        background-color: #2c3e50;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        color: white;
      }

      .shipment-status {
        height: 100px;
      }

      .shipment-status.pending {
        background-color: #ffc107;
      }

      .shipment-status.in_transit {
        background-color: #17a2b8;
      }

      .shipment-status.delivered {
        background-color: #28a745;
      }

      .card-content {
        padding: 1rem;
      }

      .shipment-info {
        align-items: center;
        flex-direction: row;
        display: flex;
        justify-content: space-around;
        width: 100%;
      }

      .shipment-details p {
        border-left: 1px solid black;
        padding-left: 70px;
      }
    `,
  ],
})
export class ShipmentScheduleComponent implements OnInit {
  daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  currentViewDate = new Date();
  selectedDate = new Date();
  daysInMonth: (Date | null)[] = [];
  selectedDateShipments: Shipment[] = [];
  allShipments: Shipment[] = [];

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit() {
    this.setupCalendar();
    this.fetchShipments();
  }

  fetchShipments() {
    this.shipmentService.getColis().subscribe((data: any) => {
      this.allShipments = data;
      this.filterShipmentsByDate();
    });
  }

  setupCalendar() {
    const firstDayOfMonth = new Date(
      this.currentViewDate.getFullYear(),
      this.currentViewDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      this.currentViewDate.getFullYear(),
      this.currentViewDate.getMonth() + 1,
      0
    );

    this.daysInMonth = [];
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      this.daysInMonth.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      this.daysInMonth.push(
        new Date(
          this.currentViewDate.getFullYear(),
          this.currentViewDate.getMonth(),
          i
        )
      );
    }
  }

  goToPreviousMonth() {
    this.currentViewDate = new Date(
      this.currentViewDate.getFullYear(),
      this.currentViewDate.getMonth() - 1
    );
    this.setupCalendar();
  }

  goToNextMonth() {
    this.currentViewDate = new Date(
      this.currentViewDate.getFullYear(),
      this.currentViewDate.getMonth() + 1
    );
    this.setupCalendar();
  }

  onDateSelect(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.filterShipmentsByDate();
    }
  }

  filterShipmentsByDate() {
    this.selectedDateShipments = this.allShipments.filter(
      (shipment) =>
        shipment.date.toDateString() === this.selectedDate.toDateString()
    );
  }

  isDateSelected(date: Date | null): boolean {
    return date?.toDateString() === this.selectedDate.toDateString();
  }

  hasShipmentOnDate(date: Date | null): boolean {
    if (!date) return false;
    return this.allShipments.some(
      (shipment) => shipment.date.toDateString() === date.toDateString()
    );
  }
}
