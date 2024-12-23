import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/livreur"
                routerLinkActive="active"
                >Livreur</a
              >
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/statistiques"
                routerLinkActive="active"
                >Statistiques</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/colis" routerLinkActive="active"
                >Colis</a
              >
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <img
              src="assets/Background.png"
              alt="User profile"
              class="rounded-circle"
              style="width: 40px; height: 40px;"
            />
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent {}
