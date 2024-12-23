import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
export interface Livreur {
  id: number;
  nom: string;
  numero: string;
  specialties: string;
  description: string;
  descriptionES: string;
}
@Injectable({
  providedIn: "root",
})
export class LivreurService {
  private livreurs = new BehaviorSubject<Livreur[]>([
    {
      id: 1,
      nom: "Livreur 1",
      numero: "1",
      specialties: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet",
      descriptionES: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      nom: "Livreur 2",
      numero: "2",
      specialties: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet",
      descriptionES: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      nom: "Livreur 3",
      numero: "3",
      specialties: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet",
      descriptionES: "Lorem ipsum dolor sit amet",
    },
  ]);

  getLivreurs(): Observable<Livreur[]> {
    return this.livreurs.asObservable();
  }

  addLivreur(livreur: Omit<Livreur, "id">): void {
    const currentLivreurs = this.livreurs.value;
    const newId = Math.max(...currentLivreurs.map((l) => l.id)) + 1;
    this.livreurs.next([...currentLivreurs, { ...livreur, id: newId }]);
  }

  updateLivreur(livreur: Livreur): void {
    const currentLivreurs = this.livreurs.value;
    const index = currentLivreurs.findIndex((l) => l.id === livreur.id);
    if (index !== -1) {
      currentLivreurs[index] = livreur;
      this.livreurs.next([...currentLivreurs]);
    }
  }

  deleteLivreur(id: number): void {
    const currentLivreurs = this.livreurs.value;
    this.livreurs.next(currentLivreurs.filter((l) => l.id !== id));
  }
}
