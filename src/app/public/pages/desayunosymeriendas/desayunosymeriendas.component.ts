import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AsyncPipe } from '@angular/common';
import { Recipe } from '../../../models/recipe';
import { RecipesService } from '../../../services/recipes.service';
import { Observable } from 'rxjs';
import { ModalInfoComponent } from '../../components/header/modal-info/modal-info.component';
import { FavouritesService } from '../../../services/favourites.service';


@Component({
  selector: 'app-desayunosymeriendas',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe, ModalInfoComponent, ModalInfoComponent],
  templateUrl: './desayunosymeriendas.component.html',
  styleUrl: './desayunosymeriendas.component.scss'
})
export class DesayunosymeriendasComponent{

  private _recipeService = inject(RecipesService);
  private _favoritesService = inject(FavouritesService);
  breakfast$ : Observable<Recipe[]> = this._recipeService.getRecipeType('breakfast');
  breakfastSelected : Recipe | undefined;
  isModalOpen = false;
  openModal(breakfastSelected : Recipe): void {
    this.breakfastSelected = breakfastSelected;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  isFavourite(id: number): boolean {
    return this._favoritesService.isFavorite(id);
  }

  toggleFavorite(breakfast:Recipe): void {
    if (!this.isFavourite(breakfast.id)) {
      this._favoritesService.addFavorite(breakfast);
    } else {
      this._favoritesService.removeFavorite(breakfast);
    }
  }
}
