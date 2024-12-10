import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Recipe, Step } from '../../../../models/recipe';
import { RecipesService } from '../../../../services/recipes.service';
import { EMPTY, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})
export class ModalInfoComponent implements OnChanges{

  @Input() isOpen: boolean = false; // 19 Controla si el modal está visible, es decir que si esta abierto le pido que me muestre el modal y si esta en false, que no lo muestre (el modal es lo que salta con la imagen y la receta)
  @Input() recipe : Recipe | undefined; //20 recibe el si esta abierto o cerrado (lo de arriba), va a recibir la receta que yo tengo que mostrar en el modal.
  @Output() close = new EventEmitter<void>(); //21 y despues aca voy a emitir un evento, cada vez que yo cierro el modal, tengo que avisarle al componente padre que lo estoy cerrando
//los inputs son para obtener los datos y el output es para emitir el evento del cerrado
  steps$ : Observable<Step[]> = EMPTY; //yo de la receta tengo 3 cosas: id, imagen y el titulo, y yo con esos datos tengo que buscar los pasos de como hacer la receta

  private _recipeService = inject(RecipesService)
  ngOnChanges(changes: SimpleChanges): void { //22 el ngonchanges es un sitio de vida, que lo que hace es que detecta cada vez que hay un cambio en el componente, para que cada vez que se me cambia la receta a mi (eso lo vemos en el if changes recipe) se vaya mostrando cada vez una receta distinta, porque sino el modal se queda con la receta anterior
    if(changes['recipe']){

    const currentRecipe : Recipe = changes['recipe'].currentValue; //se muestra el nuevo valor de la receta
    if(currentRecipe){
      currentRecipe.id; //obtengo la receta
      this.steps$ = this._recipeService.getStepsRecipe(currentRecipe.id); //y aca obtengo los pasos de esa receta (voy a la funcion en el servicio). (volvemos)los pasos para hacer la receta lo guardamos en un observable, en este caso steps$ que en un principio va a estar vacio pero cuando se llena me lo lista con el for del html(vamos alla)
    }
  }

  }

  closeModal(): void {
    this.isOpen = false;
    this.close.emit(); // Notifica al componente padre
  }

}