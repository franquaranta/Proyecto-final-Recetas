import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";  // Importa el Header si lo usas aquí

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [HeaderComponent, RouterModule],  // Asegúrate de importar RouterModule
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent {
  constructor(private router: Router) {}

  navigateToCategory(category: string) {
    this.router.navigate([category]);  // Redirige según la categoría seleccionada
  }
}
