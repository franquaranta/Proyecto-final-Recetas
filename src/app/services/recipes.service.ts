import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //para realizar solicitudes http y configurar encabezados
import { map, Observable } from 'rxjs'; //para trabajar con flujos de datos reactivos como los observables y operadores como map
import { Recipe, RecipeInfo, RecipeStepsInfo } from '../models/recipe';
import { RecipeAdapter } from '../models/adapter';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private _http: HttpClient) {} //4httpclient es el modulo que usa angular para hacer consultas de tipo http recuest, lo que hacemos es extraer al constructor como un servicio (es un servicio que ya esta en angular) que lo declaras con una variable privada (_http)

  getRecipeType(type : string): Observable<Recipe[]> { //13.1 este seria el observable de recetas, que el observable es una propiedad de angular (la funcion de getrecipetype la tenemos en las 3 partes del trabajo)
    const headers = new HttpHeaders({ //se crea un objeto httpheaders con clave x-api.key extraida de enviroment
      'x-api-key': enviroment.apiKey,
    });
    return this._http
      .get<RecipeInfo>(`${enviroment.apiUrl}/recipes/complexSearch?type=${type}`, { //1podemos ver que la url siempre es la misma, y va variando lo de recetas y lo de al lado
        headers,
      })
      .pipe(map((result) => RecipeAdapter(result))); //12 para que me devuelva las recetas hago u pipe (directiva que se le agrega a la funcion para agregarle mas funciones adentro, como el map que mapea, que no lo puedo ejecutar directamente sin el pipe)
  } //13 lo que hago con el map es devolver lo que esta adentro de la respuesta (recipeinfo), pero como los datos que estan en info no nos servian, lo que hicimos fue filtrar y devolvemos un observable de recetas
//funcion con la que obtengo los pasos de las recetas
  getStepsRecipe( id :number ) : any{
    const headers = new HttpHeaders({ //2es el apikey que viene de enviroment
      'x-api-key': enviroment.apiKey, //aca vemos que el headers es el apikey
    });
    return this._http
    .get<RecipeStepsInfo>(`${enviroment.apiUrl}/recipes/${id}/analyzedInstructions`, { //3haces la llamada con el this.http (es del modulo http client de angular)
      headers, //10el headers es el apikey //5usamos el get porque queremos obtener
      //6elRecipeStepsInfo es el tipado que es una capa de seguridad para no ingresar cualquier cosa
      //7cuando hacemos http.get nos va a devolver algo, en este caso nos va a devolver (ir a recipe.ts)
    }).pipe( //11 usamos pipe para hecer un mapeo, porque el api no me devuelve recetas, me devuelve (vamos a recipe.ts)
      map((instructions) => Array.isArray(instructions) ? instructions[0].steps : []), //23 lo unico que nos va a devolver es un arreglo vacio si es que no tiene pasos (porq hay un par q no tienen) y lo pusimos para que no explote si nos aparece alguno sin pasos
    ); //24 si vienen con recetas, me devuelve todo el array de la receta (venian todas con un arreglo en step123...) (volvemos a modal-infots)
  }
}