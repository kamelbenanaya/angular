import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <div class="container-fluid">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .main-content {
        flex: 1;
        padding-top: 64px; /* Height of the header */
        background-color: var(--background-color);
      }

      .footer {
        background-color: white;
        padding: 1rem 0;
        box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
      }

      @media (max-width: 768px) {
        .main-content {
          padding-top: 56px; /* Smaller header height for mobile */
        }

        .footer {
          padding: 0.5rem 0;
          font-size: 0.875rem;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = "Express-TN";
}
