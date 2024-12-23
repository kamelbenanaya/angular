import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Colis {
  id: number;
  numero: string;
  poids: number;
  dimension: string;
  contenu: string;
  date: Date;
  status: "pending" | "in progress" | "delivered";
}

@Injectable({
  providedIn: "root",
})
export class ShipmentService {
  private colis = new BehaviorSubject<Colis[]>([
    {
      id: 1,
      numero: "COL-001",
      poids: 2.5,
      dimension: "30x20x15",
      contenu: "Electronics",
      date: new Date(),
      status: "in progress",
    },
    {
      id: 2,
      numero: "COL-002",
      poids: 5,
      dimension: "null",
      contenu: "clothes",
      date: new Date(),
      status: "in progress",
    },
  ]);

  getColis(): Observable<Colis[]> {
    return this.colis.asObservable();
  }

  getColisByDate(date: Date): Observable<Colis[]> {
    return new BehaviorSubject(
      this.colis.value.filter(
        (c) => c.date.toDateString() === date.toDateString()
      )
    ).asObservable();
  }

  addColis(colis: Omit<Colis, "id">): void {
    const currentColis = this.colis.value;
    const newId = Math.max(...currentColis.map((c) => c.id)) + 1;
    this.colis.next([...currentColis, { ...colis, id: newId }]);
  }

  updateColis(colis: Colis): void {
    const currentColis = this.colis.value;
    const index = currentColis.findIndex((c) => c.id === colis.id);
    if (index !== -1) {
      currentColis[index] = colis;
      this.colis.next([...currentColis]);
    }
  }

  deleteColis(id: number): void {
    const currentColis = this.colis.value;
    this.colis.next(currentColis.filter((c) => c.id !== id));
  }
}
