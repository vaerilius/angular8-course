import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT

  constructor(public payload: Ingredient) {
  }
}


export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENTS;

  constructor(public payload: { index: number, newIngredient: Ingredient }) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = UPDATE_INGREDIENTS;

  constructor(public payload: number) {
  }
}


export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient;

