import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private _storageKey = 'favourites';

  constructor() {
    this.initializeFavorites(); //1primero inicializamos el localstorage porque si esto se usa en distintas compus, cada una va a tener faveadas cosas distintas, ya que se guarda en cada navegador, no en una base de datos.
  }

  private initializeFavorites(): void {
    if (this.isBrowser() && !localStorage.getItem(this._storageKey)) { //2verifico si el localstorage esta creado (si esta creado no hace nada), y sino.. (abajo)
      localStorage.setItem(this._storageKey, JSON.stringify([])); //2.1si no existe nada en el localstorage lo que hace es agregarlo como vacio, es decir creo el localstorage de un arreglo vacio llamado favorites
    }
  }
  private isBrowser(): boolean { //3 esta funcion de isBrowser tuvimos que crearla (sabemos que es rara), pero nos saltaban problemas porque como que no nos estaba reconociendo el localstorage entonces de esta manera pudimos lograrlo. Lo que pasaba es que basicamente no nos estaba detectando que estabamos en un navegador entonces no se reconocia el localstorage
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  addFavorite(recipe: any): void {
    if (this.isBrowser()) {
      const favorites = this.getFavorites();//5.1 aca obtenemos el arreglo de favoritos.
      const isAlreadyFavorite = favorites.some((fav) => fav.id === recipe.id);  //5 si queremos agregar alguno a favoritos, lo que hacemos es hacer un some que lo que hace es devolverme un true o un false (dependiendo si existe el id en el arreglo de la receta, es decir que si ya estaba agregado no lo vuelve a agregar)
      if (!isAlreadyFavorite) { //5.2 si no estaba en favoritos...
        favorites.push(recipe); //6 agregamos la receta a favoritos
        localStorage.setItem(this._storageKey, JSON.stringify(favorites)); //y aca finalmente lo subo a localstorage
      }
    }
  }

  getFavorites(): any[] {
    if (this.isBrowser()) {
      const storedFavorites = localStorage.getItem(this._storageKey); //4 lo que hace es que obtengo lo que tengo en el localstorage
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  }

  removeFavorite(recipe: Recipe): void { //7 es basicamente lo mismo que para agregarlo
    if (this.isBrowser()) {
      const favorites = this.getFavorites(); 
      const updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id); //aca con el filter lo que hacemos es eliminar el id seleccionado, y despues denuevo lo subis a localstorage
      localStorage.setItem(this._storageKey, JSON.stringify(updatedFavorites));
    }
  }

  isFavorite(recipeId: number): boolean { //8 esta funcion lo que hace es que valida si una receta ya estaba o no en favoritos (vamos al ejemplo en el html de postres)
    if (this.isBrowser()) { //aca!!! sigo aca lo del ts de postres: obtenemos el id 
      const favorites = this.getFavorites(); //obtenemos los favoritos
      return favorites.some((fav) => fav.id === recipeId); //nos fijamos si esa comida existe entre los favoritos, y me devuelve true o false (volvemos al postres ts a explicar el togle favorites)
    }
    return false;
  }
}