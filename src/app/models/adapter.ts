import { RecipeInfo } from "./recipe"; 

export const RecipeAdapter = (recipeInfo: RecipeInfo) =>{ //este recipeadapter lo uso en el servicio de recetas para que nos limpie la respuesta y nos devuelva bien la receta, y no total de columnas y eso.
  return recipeInfo.results;
}