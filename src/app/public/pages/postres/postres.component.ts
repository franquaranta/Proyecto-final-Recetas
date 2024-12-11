import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RecipesService } from '../../../services/recipes.service';
import { Recipe } from '../../../models/recipe';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ModalInfoComponent } from '../../components/header/modal-info/modal-info.component';
import { FavouritesService } from '../../../services/favourites.service';

@Component({
  selector: 'app-postres',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe, ModalInfoComponent],
  templateUrl: './postres.component.html',
  styleUrl: './postres.component.scss'
})
export class PostresComponent {
  private _recipeService = inject(RecipesService) //14 lo primero que hago para usar la funcion es obtener el servicio que tenemos en recipe service, donde adentro hay funciones. entonces guardo recipeservice dentro de la variable de _recipeservuce
  private _favoritesService = inject(FavouritesService)
  desserts$ : Observable<Recipe[]> = this._recipeService.getRecipeType('dessert'); //15 para poder recorrer todos los postres en este caso, creo una variable (desserts$) de tipo observable, que lo que nos permite es ir escuchando todo el tiempo resultados, para que si la api por ejemplo me agrega una receta o me elimina una receta, yo lo voy a ver plasmado en el html sin tener que volver a consultar el servicio, los observables son suceptibles a cualquier cambio.
  //16 lo llamo con el this..... y enotonces automaticamente se cargan los postres aca (desserts$) (paso a html)
  dessertSelected : Recipe | undefined;
  isModalOpen = false;

  openModal(dessertSelected : Recipe): void {
    this.dessertSelected = dessertSelected;
    this.isModalOpen = true;
  }


  closeModal(): void {
    this.isModalOpen = false;
  }

  isFavourite(id: number): boolean {  //esto despues!! le paso el id de la receta y llamo dentro de favoriteservce a is favorite, (voy al servicio de favorites)
    return this._favoritesService.isFavorite(id); 
  }

  toggleFavorite(dessert:Recipe): void {
    if (!this.isFavourite(dessert.id)) { //si no esta en favoritos, lo arregla
      this._favoritesService.addFavorite(dessert);
    } else {
      this._favoritesService.removeFavorite(dessert); //si esta adentro de favoritos, lo remueve
    }
  }
}
