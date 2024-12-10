import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RecipesService } from '../../../services/recipes.service';
import { Observable } from 'rxjs';
import { Recipe } from '../../../models/recipe';
import { AsyncPipe } from '@angular/common';
import { ModalInfoComponent } from '../../components/header/modal-info/modal-info.component';
import { FavouritesService } from '../../../services/favourites.service';


@Component({
  selector: 'app-almuerzos',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe, ModalInfoComponent, ModalInfoComponent],
  templateUrl: './almuerzos.component.html',
  styleUrl: './almuerzos.component.scss'
})
export class AlmuerzosComponent {
  private _recipeService = inject(RecipesService)
  lunches$ : Observable<Recipe[]> = this._recipeService.getRecipeType('main course');
  private _favoritesService = inject(FavouritesService);
  lunchSelected : Recipe | undefined;
  isModalOpen = false;

  openModal(lunchSelected : Recipe): void {
    this.lunchSelected = lunchSelected;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  isFavourite(id: number): boolean {
    return this._favoritesService.isFavorite(id);
  }

  toggleFavorite(lunch:Recipe): void {
    if (!this.isFavourite(lunch.id)) {
      this._favoritesService.addFavorite(lunch);
    } else {
      this._favoritesService.removeFavorite(lunch);
    }
  }
}