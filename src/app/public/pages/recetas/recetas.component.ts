import { Component, Inject, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";  // Importa el Header si lo usas aquí
import { RecipesService } from '../../../services/recipes.service';
import { Observable } from 'rxjs';
import { Recipe } from '../../../models/recipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [HeaderComponent, RouterModule],  // Asegúrate de importar RouterModule
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit{
  constructor(private router: Router) {}

  // private _recipesService = inject(RecipesService);
  // recipes$ :Observable<Recipe[]> = this._recipesService.getRecipes();


  ngOnInit(): void {
  }
  navigateToCategory(category: string) {
    this.router.navigate([category]);  // Redirige según la categoría seleccionada
  }
}