import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "colis",
        loadComponent: () =>
          import("./pages/colis/colis.component").then(
            (m) => m.ShipmentScheduleComponent
          ),
      },
      {
        path: "livreur",
        loadComponent: () =>
          import("./pages/livreur/livreur.component").then(
            (m) => m.LivreurComponent
          ),
      },
      {
        path: "statistiques",
        loadComponent: () =>
          import("./pages/statistiques/statistiques.component").then(
            (m) => m.StatistiquesComponent
          ),
      },

      {
        path: "",
        loadComponent: () =>
          import("./pages/login/login.component").then((m) => m.Login),
      },
    ],
  },
];
