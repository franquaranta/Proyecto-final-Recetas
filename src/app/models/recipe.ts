import { Info } from "./api"

export interface Recipe{
  id: number,
  title: string,
  image: string,
  imageType:string
}

export interface RecipeInfo{
  info: Info //me devuelve este objeto que tiene un campo que se llama info, me trae un par de datos que no nos servian
  results: Recipe[], //y adentro de results tengo las recetas
}

export interface RecipeStepsInfo{
  name: string; //8 nos va a devolver un nombre de tipo string y los pasos
  steps: Step[];
}

export interface Step{ //9 estos serian los pasos
  step: string;
  number: number;
  ingredients: Ingredient[];
  equipment: Equipment[];
}

interface Ingredient{
  id: number;
  image: string;
  localizedName: string;
  name: string;
}

interface Equipment{
  id: number;
  image: string;
  localizedName: string;
  name: string;
}