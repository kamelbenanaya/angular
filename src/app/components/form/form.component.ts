import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

export interface Livreur {
  id: number;
  nom: string;
  numero: string;
  specialties: string;
  description: string;
  descriptionES: string;
}

@Component({
  selector: "app-livreur-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="livreurForm" (ngSubmit)="onSubmit()" class="form">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input id="nom" type="text" formControlName="nom" />
      </div>

      <div class="form-group">
        <label for="numero">Numéro</label>
        <input id="numero" type="text" formControlName="numero" />
      </div>

      <div class="form-group">
        <label for="specialties">specialties</label>
        <input id="specialties" type="text" formControlName="specialties" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" formControlName="description"></textarea>
      </div>

      <div class="form-group">
        <label for="descriptionES">Description ES</label>
        <textarea id="descriptionES" formControlName="descriptionES"></textarea>
      </div>

      <button type="submit" [disabled]="!livreurForm.valid">
        {{ livreur ? "Modifier" : "Ajouter" }}
      </button>
    </form>
  `,
})
export class LivreurFormComponent {
  @Input() livreur?: Livreur;
  @Output() save = new EventEmitter<Omit<Livreur, "id">>();

  livreurForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.livreurForm = this.fb.group({
      nom: ["", Validators.required],
      numero: ["", Validators.required],
      specialties: ["", Validators.required],
      description: ["", Validators.required],
      descriptionES: ["", Validators.required],
    });
  }

  ngOnInit() {
    if (this.livreur) {
      this.livreurForm.patchValue(this.livreur);
    }
  }

  onSubmit() {
    if (this.livreurForm.valid) {
      this.save.emit(this.livreurForm.value);
    }
  }
}
