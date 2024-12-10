import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FavouritesService } from '../../../services/favourites.service';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent{
  private _favoritesService = inject(FavouritesService);
  favorites = this._favoritesService.getFavorites(); //aca en favoritos lo unico que hicimos fue obtener get favorites que lo que hace es obtener el arreglo de favoritos del localstorage, y en el html lo recorro y lo muestro


  removeFromFavorites(favorite: Recipe){ //si queremos remover el favorito se ejecuta de esta manera
    this._favoritesService.removeFavorite(favorite);
    this.favorites = this.favorites.filter((fav) => fav.id !== favorite.id); //y aca actualizamos el arreglo, para que se elimine al toque y no haya que actualizar la pagina
  }


}
